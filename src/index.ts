import axios from 'axios';
import { DynamicCollection } from "./collections";
import { OfferGroupFilter } from "./interfaces";
import { MONGO_URL, MONGO_DB_NAME, OFFER_DETAIL_URL, OFFER_GROUPS_URL, OFFER_COLLECTION_NAME, GROUP_COLLECTION_NAME, OFFER_GROUP_FILTER } from "./constants";


const offerCollection = new DynamicCollection(OFFER_COLLECTION_NAME, MONGO_URL, MONGO_DB_NAME);
const groupCollection = new DynamicCollection(GROUP_COLLECTION_NAME, MONGO_URL, MONGO_DB_NAME);

const getOfferGroupsData = async (url: string, filter: OfferGroupFilter) => {
  const response = await axios.post(url, filter);
  return response.data;
}

const getOfferDetail = async (url: string) => {
  const response = await axios.get(url);
  return response.data;
}

const init = async () => {
  const data =  await getOfferGroupsData(OFFER_GROUPS_URL, OFFER_GROUP_FILTER);
  for (const group of data.result.groups) {
    const queriedGroup = await groupCollection.read({date: group.date, time: group.time});
    if (!queriedGroup.length) {
      const createdGroupId = await groupCollection.create(group);
      console.log(`Group created: ${createdGroupId}`);
      for (const offer of group.offers) {
        const queriedOffers = await offerCollection.read({offer_id: offer.id});
        if (!queriedOffers.length) {
          const offerDetail = await getOfferDetail(OFFER_DETAIL_URL.replace("[offer_id]", offer.id));
          console.log("offerDetail: ", offerDetail);
          const createdOfferId = await offerCollection.create(offerDetail.data);
          console.log(`Offer created: ${createdOfferId}`);
        }
      }
    }
  }
}

init();

