import { Pool, QueryResult, QueryResultRow } from 'pg'

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  user: process.env.DB_USER || 'booknest',
  password: process.env.DB_PASSWORD || 'booknest_password',
  database: process.env.DB_NAME || 'booknest',
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
})

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err)
})

export const query = async <T extends QueryResultRow = QueryResultRow>(
  text: string,
  params?: any[],
): Promise<QueryResult<T>> => {
  const start = Date.now()
  try {
    const res = await pool.query<T>(text, params)
    const duration = Date.now() - start
    if (duration > 1000) {
      console.warn(`[SLOW QUERY] ${duration}ms: ${text}`, params)
    }
    return res
  } catch (error) {
    console.error('Database query error:', error)
    throw error
  }
}

export const getClient = async () => {
  return pool.connect()
}

export const closePool = async () => {
  await pool.end()
}

export default pool
