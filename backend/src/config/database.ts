import { supabase, supabaseAdmin } from './supabase'

export interface QueryResult<T> {
  rows: T[]
}

const rpc = async <T = any>(
  fn: string,
  args: Record<string, any> = {},
): Promise<QueryResult<T>> => {
  const { data, error } = await supabaseAdmin.rpc(fn, args)
  if (error) throw error
  return { rows: data || [] }
}

export const query = async <T = any>(
  text: string,
  params?: any[],
): Promise<QueryResult<T>> => {
  const start = Date.now()
  try {
    const { data, error } = await supabaseAdmin.rpc('exec_sql', {
      query_text: text,
      query_params: params || [],
    })

    if (error) throw error

    const duration = Date.now() - start
    if (duration > 1000) {
      console.warn(`[SLOW QUERY] ${duration}ms: ${text}`, params)
    }

    return { rows: data || [] }
  } catch (error) {
    console.error('Database query error:', error)
    throw error
  }
}

export const insert = async <T = any>(
  table: string,
  data: Record<string, any> | Record<string, any>[],
): Promise<QueryResult<T>> => {
  const { data: rows, error } = await supabaseAdmin
    .from(table)
    .insert(data)
    .select()

  if (error) throw error
  return { rows: rows || [] }
}

export const update = async <T = any>(
  table: string,
  data: Record<string, any>,
  filters: Record<string, any>,
): Promise<QueryResult<T>> => {
  let q = supabaseAdmin.from(table).update(data)
  for (const [key, value] of Object.entries(filters)) {
    q = q.eq(key, value)
  }
  const { data: rows, error } = await q.select()
  if (error) throw error
  return { rows: rows || [] }
}

export const remove = async <T = any>(
  table: string,
  filters: Record<string, any>,
): Promise<QueryResult<T>> => {
  let q = supabaseAdmin.from(table).delete()
  for (const [key, value] of Object.entries(filters)) {
    q = q.eq(key, value)
  }
  const { data: rows, error } = await q.select()
  if (error) throw error
  return { rows: rows || [] }
}

export const getClient = () => supabaseAdmin
export const closePool = async () => {}

export { supabase, supabaseAdmin }
export default { query, insert, update, remove, supabase, supabaseAdmin }