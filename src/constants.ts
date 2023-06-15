import { OfferGroupFilter } from "./interfaces";
 
// export const MONGO_URL = "mongodb://admin:admin123@localhost:27017";
export const MONGO_URL = "mongodb+srv://admin:admin123@cluster0.5kdf44a.mongodb.net/";
export const  MONGO_DB_NAME = "car_auction";
export const OFFER_COLLECTION_NAME = "offers";
export const GROUP_COLLECTION_NAME = "groups";
export const OFFER_GROUPS_URL = "https://services.subastop.com/api/v2/support/offer-groups";
export const OFFER_DETAIL_URL = "https://services.subastop.com/api/v2/offer/[offer_id]/detail";
export const OFFER_GROUP_FILTER: OfferGroupFilter = {
  scope: "category",
  value: "liviano_"
}
