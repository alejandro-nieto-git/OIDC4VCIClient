import { Format } from '@sphereon/pex-models';
import { CommonSupportedMetadata, DiscoveryMetadataPayload, RPRegistrationMetadataPayload } from '../types';
export declare function assertValidMetadata(opMetadata: DiscoveryMetadataPayload, rpMetadata: RPRegistrationMetadataPayload): CommonSupportedMetadata;
export declare function supportedCredentialsFormats(rpFormat: Format, opFormat: Format): Format;
