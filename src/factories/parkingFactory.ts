import { IParking, AccessDenied, CorporateParking, CourtesyParking, Parking, PrivateParking, TypeParking, TypeUser } from '../utils';

export class ParkingFactory {
  static create(parkingType: string, userType: string): IParking {
    const isCorporate = userType === TypeUser.CORPORATE
    const isVisitor = userType === TypeUser.VISITOR
    const isWeekend = new Date().getDay() === 0 || new Date().getDay() === 6

    switch (parkingType) {
      case TypeParking.PUBLIC:
        return new Parking();
      case TypeParking.PRIVATE:
        if (isCorporate && !isWeekend) {
          return new PrivateParking()
        } else {
          return new AccessDenied()
        }
      case TypeParking.COURTESY:
        if (isVisitor && isWeekend) {
          return new CourtesyParking()
        } else {
          return new AccessDenied()
        }
      default:
        throw new Error('Invalid parking ID')
    }
  }
}