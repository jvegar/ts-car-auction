import { DynamicCollection } from "../collections";

const updateOffers = async (
    groupCol: DynamicCollection,
    offerCol: DynamicCollection,
    groupId: string
) => {
    const groups = await groupCol.read({});
    for (const group of groups) {
        for (const offer of group.offers) {
            console.log(`Updating offer: ${offer.id} with groupId: ${groupId}`);
            offerCol.update({ id: offer.id }, { group_id: groupId });
        }
    }
};

export default updateOffers;
