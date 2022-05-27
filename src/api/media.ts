import axios from './axios';

export interface ImageData {
  readonly Id: number;
  readonly MediaId: number;
  readonly ImageTypeCode: string;
  readonly Url: string;
}

export interface MediaData {
  readonly Id: number;
  readonly Title: string;
  readonly Description?: string;
  readonly Images: ImageData[];
}

export interface MediaListData {
  readonly Entities: MediaData[];
  readonly TotalCount: number;
  readonly PageNumber: number;
}

export interface MediaPlayInfoData {
  readonly MediaId: number;
  readonly ContentUrl: string;
}

export enum StreamTypeOptions {
  MAIN = 'MAIN',
  TRIAL = 'TRIAL',
}

export const media = () => {
  const token = window.sessionStorage.getItem('token');
  return {
    async getMediaList(body: {
      MediaListId: number;
      IncludeCategories: boolean;
      IncludeImages: boolean;
      IncludeMedia: boolean;
      PageNumber: number;
      PageSize: number;
    }): Promise<MediaListData> {
      return await axios
        .post<MediaListData>('Media/GetMediaList', body, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => res.data);
    },
    async getMediaPlayInfo(body: {
      MediaId: number;
      StreamType: StreamTypeOptions;
    }): Promise<MediaPlayInfoData> {
      return await axios
        .post<MediaPlayInfoData>('Media/GetMediaPlayInfo', body, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => res.data);
    },
  };
};
