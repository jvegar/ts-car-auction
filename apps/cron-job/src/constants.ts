import { OfferGroupFilter } from './interfaces'
import { config } from 'dotenv'

// Conditional dotenv loading
if (process.env.AWS_LAMBDA_FUNCTION_NAME === undefined) {
    config()
}

function requireEnv(name: string): string {
    const value = process.env[name]
    if (value === undefined) {
        throw new Error(`Required environment variable "${name}" is not set`)
    }
    return value
}

export const MONGO_URL = requireEnv('MONGO_URL')
export const MONGO_DB_NAME = requireEnv('MONGO_DB_NAME')
export const OFFER_COLLECTION_NAME = requireEnv('OFFER_COLLECTION_NAME')
export const GROUP_COLLECTION_NAME = requireEnv('GROUP_COLLECTION_NAME')
export const OFFER_GROUPS_URL = requireEnv('OFFER_GROUPS_URL')
export const OFFER_DETAIL_URL = requireEnv('OFFER_DETAIL_URL')

export const OFFER_GROUP_FILTER: OfferGroupFilter = {
    scope: process.env.OFFER_GROUP_FILTER_SCOPE ?? '',
    value: process.env.OFFER_GROUP_FILTER_VALUE ?? '',
}
