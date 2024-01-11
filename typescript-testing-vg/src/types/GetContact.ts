import PostContact from './PostContact';

export default interface GetContact extends PostContact {
  _id: string;
  lat: number;
  lng: number;
}
