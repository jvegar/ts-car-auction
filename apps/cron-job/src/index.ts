import { Handler } from "aws-lambda";
import axios from "axios";
import { DynamicCollection } from "./collections";
import { Offer, OfferGroup, OfferGroupFilter } from "./interfaces";
import {
    MONGO_URL,
    MONGO_DB_NAME,
    OFFER_DETAIL_URL,
    OFFER_GROUPS_URL,
    OFFER_COLLECTION_NAME,
    GROUP_COLLECTION_NAME,
    OFFER_GROUP_FILTER,
} from "./constants";
// ** TODO: Implement update offers
// import updateOffers from "./utils/update-offers";

let offerCollection: DynamicCollection<Offer>;
let groupCollection: DynamicCollection<OfferGroup>;

const initializeCollections = async () => {
    offerCollection = await DynamicCollection.create(
        OFFER_COLLECTION_NAME,
        MONGO_URL,
        MONGO_DB_NAME
    );
    groupCollection = await DynamicCollection.create(
        GROUP_COLLECTION_NAME,
        MONGO_URL,
        MONGO_DB_NAME
    );
};

const getOfferGroupsData = async (
    url: string,
    filter: OfferGroupFilter
): Promise<OfferGroup[]> => {
    let offerGroupsData: OfferGroup[] = [];
    try {
        const offerGroupsResponse = await axios.post(url, filter);
        offerGroupsData = offerGroupsResponse.data.result
            .groups as OfferGroup[];
    } catch (error) {
        console.error(`Error: ${error}`);
    }
    return offerGroupsData;
};

const getOfferDetailData = async (url: string): Promise<Offer | undefined> => {
    let offerDetailData: Offer | undefined = undefined;
    try {
        const offerDetailResponse = await axios.get(url);
        offerDetailData = offerDetailResponse.data.data;
    } catch (error) {
        console.error(`Error: ${error}`);
    }

    return offerDetailData;
};

export const handler: Handler = async () => {
    try {
        await init();
        return { statusCode: 200, body: "Process completed successfully" };
    } catch (error) {
        console.error("Error:", error);
        return { statusCode: 500, body: "An error occurred during execution" };
    }
};

const init = async () => {
    await initializeCollections();

    const groupsData = await getOfferGroupsData(
        OFFER_GROUPS_URL,
        OFFER_GROUP_FILTER
    );

    if (groupsData)
        for (const group of groupsData) {
            let groupId;
            const queriedGroup = await groupCollection.read({
                date: group.date,
                time: group.time,
            });
            groupId = queriedGroup[0]?._id;
            if (!groupId) {
                groupId = await groupCollection.create(group);
                console.log(`Group created: ${groupId}`);
            }
            for (const offer of group.offers) {
                const queriedOffers = await offerCollection.read({
                    offer_id: offer.id,
                });
                if (!queriedOffers.length) {
                    const offerDetailData = await getOfferDetailData(
                        OFFER_DETAIL_URL.replace("[offer_id]", offer.id)
                    );
                    if (offerDetailData) {
                        const createdOfferId = await offerCollection.create({
                            groud_id: groupId,
                            created_at: new Date().toISOString(),
                            ...offerDetailData,
                        });
                        console.log(`Offer created: ${createdOfferId}`);
                    }
                }
            }
        }
    await offerCollection.close();
    await groupCollection.close();
};

if (process.env.NODE_ENV !== "production") {
    init();
}
