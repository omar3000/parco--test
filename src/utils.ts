export interface IParking {
    enter(): { success: boolean, errorCode: number, message?: string };
}
export class Parking implements IParking {
  enter() {
    return { success: true, errorCode: 0  }
  }
}

export class AccessDenied implements IParking {
  enter() {
    return { success: false, errorCode: 403, message: "Denegado"  }
  }
}

export class PrivateParking implements IParking {
    enter() {
      return { success: true, errorCode: 0 }
    }
}

export class CorporateParking implements IParking {
    enter() {
      return { success: true, errorCode: 0 }
    }
}

export class CourtesyParking implements IParking {
    enter() {
      return { success: true, errorCode: 0 }
    }
}

export enum TypeParking {
  PUBLIC= 'public',
  PRIVATE = 'private',
  COURTESY = 'courtesy',
}

export enum TypeUser {
  CORPORATE= 'corporate',
  PRIVATE = 'private',
  VISITOR = 'visitor',
}