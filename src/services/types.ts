import type {
  GetApiGuestsRequestsResponse,
  GetApiGalleryResponse,
  GetApiGalleryByGalleryIdResponse,
  PostApiAuthTelegramResponses
} from './client'

// Auth
export type AuthResponse = PostApiAuthTelegramResponses[200]
export type AuthUser = AuthResponse['user']

// Guests
export type GuestUser = GetApiGuestsRequestsResponse extends Array<infer T> ? T : never
export type ApprovalStatus = GuestUser['approvalStatus']

// Gallery
export type Gallery = GetApiGalleryResponse extends Array<infer T> ? T : never
export type GalleryDetail = GetApiGalleryByGalleryIdResponse
export type Photo = GalleryDetail['photos'] extends Array<infer T> ? T : never