import type { BaseType, MessageStatus } from "./common";

export interface TrustedPartner extends BaseType {
  name: string;
  description: string;
  image: string;

}

export interface TrustedPartnerResponse extends MessageStatus {
  data: {
    trusted_partner_data: TrustedPartner[];
  };
}
