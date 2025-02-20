import { Document } from "mongodb";

export interface OfferGroupFilter {
    scope: string;
    value: string;
}

export interface Offer extends Document {
    id: string;
    group_id: string;
    state: string;
    offer_type: string;
    image_xs: string;
    image_md: string;
    name: string;
    model_year: string;
    is_financing: boolean;
    mileage: number | null;
    base_price: number;
    win_now: number | null;
    live_tag: string | null;
    close_date: string;
    readable_close_date: {
        date: string;
        time: string;
        meridian: string;
    };
    stats: {
        views: number;
        interested: number;
        participants: number;
        negotiations: number | null;
    };
    owner: {
        name: string | null;
        subascore: number;
    };
    with_virtual_inspection: boolean;
    inspector_is_online: boolean;
}

export interface OfferGroup extends Document {
    owner: string | null;
    date: string;
    time: string;
    created_at: string;
    url: string | null;
    group_navigation_url: string;
    offers_count: number;
    status: string | null;
    offers: Offer[];
    with_virtual_inspection: boolean;
    inspector_is_online: boolean;
}
