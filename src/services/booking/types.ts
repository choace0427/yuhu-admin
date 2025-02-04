export interface BookingList {
	id: string;
	therapist_id: string;
	booking_message: string;
	booking_status: string;
	customer_id: string;
	b_date: { date: string; range: any[] };
	customers_list: any;
	therapist_list: any;
	service: string;
}
