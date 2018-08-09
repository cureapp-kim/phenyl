import React, { Component } from 'react'
import { Form } from 'semantic-ui-react'

type Props = {
  match: any,
  sessionId: string,
  operations: Array<string>,
  defaultPayloads: { [string]: Object },
  execute: ({ entityName: string, method: string, payload: any }) => any,
}

type State = {
  method: string, // FIXME: enum
  payload: string,
}

class OperationEditor extends Component<Props, State> {
  state: State = {
    method: null,
    payload: null,
  }

  handleChangeOperation = (event, { value }) => {
    if (!this.props.defaultPayloads[value]) {
      throw new Error(`Unknown method: ${value}`)
    }

    const payload = this.props.defaultPayloads[value]

    this.setState({
      method: value,
      payload: JSON.stringify(payload, null, 2),
    })
  }

  handleChangePayload = (event, { value }) => {
    this.setState({ payload: value })
  }

  handleRun = () => {
    const { match, execute } = this.props

    const payload = JSON.parse(this.state.payload)
    execute({
      sessionId: this.props.sessionId,
      entityName: match.params.entityName,
      method: this.state.method,
      payload,
    })
  }

  componentDidMount() {
    const { operations } = this.props

    this.handleChangeOperation(null, { value: operations[0] })
  }

  render () {
    const { operations } = this.props
    return (
      <div>
        <Form>
          <Form.Group>
            <Form.Select
              label='Operation'
              options={operations.map(op => ({
                key: op,
                text: op,
                value: op,
              }))}
              defaultValue={operations[0]}
              onChange={this.handleChangeOperation}
            />
          </Form.Group>
          <Form.TextArea
            rows={4}
            label='Payload'
            value={this.state.payload}
            onChange={this.handleChangePayload}
          />
          <Form.Button
            positive
            onClick={this.handleRun}
          >
            Run
          </Form.Button>
        </Form>
      </div>
    )
  }
}

export default OperationEditor
