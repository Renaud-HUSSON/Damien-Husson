/* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export interface RealisationGetSuccessResponseSchemaInterface {
  success?: boolean;
  data?: {
    id?: number;
    titre?: string;
    image?: string;
    description?: string;
    likes?: number;
    createdAt?: string;
    updatedAt?: string;
    [k: string]: unknown;
  }[];
  total?: number;
  [k: string]: unknown;
}
