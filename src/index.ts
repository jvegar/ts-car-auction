import { Handler } from 'aws-lambda'
import axios from 'axios'
import { DynamicCollection } from './collections'
import { OfferGroupFilter } from './interfaces'
import {
    MONGO_URL,
    MONGO_DB_NAME,
    OFFER_DETAIL_URL,
    OFFER_GROUPS_URL,
    OFFER_COLLECTION_NAME,
    GROUP_COLLECTION_NAME,
    OFFER_GROUP_FILTER,
} from './constants'

let offerCollection: DynamicCollection
let groupCollection: DynamicCollection

const initializeCollections = async () => {
    offerCollection = await DynamicCollection.create(
        OFFER_COLLECTION_NAME,
        MONGO_URL,
        MONGO_DB_NAME
    )
    groupCollection = await DynamicCollection.create(
        GROUP_COLLECTION_NAME,
        MONGO_URL,
        MONGO_DB_NAME
    )
}

const getOfferGroupsData = async (url: string, filter: OfferGroupFilter) => {
    const offerGroupsResponse = await axios.post(url, filter)
    return offerGroupsResponse.data
}

const getOfferDetail = async (url: string) => {
    const offerDetailResponse = await axios.get(url)
    return offerDetailResponse.data
}

export const handler: Handler = async (event, context) => {
    try {
        await init()
        return { statusCode: 200, body: 'Process completed successfully' }
    } catch (error) {
        console.error('Error:', error)
        return { statusCode: 500, body: 'An error occurred during execution' }
    }
}

const init = async () => {
    await initializeCollections()
    const data = await getOfferGroupsData(OFFER_GROUPS_URL, OFFER_GROUP_FILTER)
    for (const group of data.result.groups) {
        const queriedGroup = await groupCollection.read({
            date: group.date,
            time: group.time,
        })
        if (!queriedGroup.length) {
            const createdGroupId = await groupCollection.create(group)
            console.log(`Group created: ${createdGroupId}`)
        }
        for (const offer of group.offers) {
            const queriedOffers = await offerCollection.read({
                offer_id: offer.id,
            })
            if (!queriedOffers.length) {
                const offerDetail = await getOfferDetail(
                    OFFER_DETAIL_URL.replace('[offer_id]', offer.id)
                )
                const createdOfferId = await offerCollection.create(
                    offerDetail.data
                )
                console.log(`Offer created: ${createdOfferId}`)
            }
        }
    }
    await offerCollection.close()
    await groupCollection.close()
}

if (process.env.NODE_ENV !== 'production') {
    init()
}
