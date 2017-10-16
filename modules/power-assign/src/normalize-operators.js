// @flow

import type {
  UpdateOperators,
} from 'mongolike-operations'

/**
 *
 */
export function normalizeOperators(ops: Object): UpdateOperators {
  const firstKey = Object.keys(ops)[0]
  if (!firstKey) return ops
  if (firstKey.charAt(0) !== '$') return { $set: ops }
  return ops
}