/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Body_predict_multiple_value_predict_upload_file_post } from '../models/Body_predict_multiple_value_predict_upload_file_post';
import type { PredictSingleValue } from '../models/PredictSingleValue';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class PredictService {

    /**
     * Predict Single Value
     * @returns any Successful Response
     * @throws ApiError
     */
    public static predictSingleValuePredictSingleDatasetPost({
requestBody,
}: {
requestBody: PredictSingleValue,
}): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/predict/single-dataset',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Predict Multiple Value
     * @returns any Successful Response
     * @throws ApiError
     */
    public static predictMultipleValuePredictUploadFilePost({
formData,
}: {
formData: Body_predict_multiple_value_predict_upload_file_post,
}): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/predict/upload-file',
            formData: formData,
            mediaType: 'multipart/form-data',
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
