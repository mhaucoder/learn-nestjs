import { Injectable } from '@nestjs/common/decorators/core';

@Injectable()
export class RolesService {
  matchRoles(roles: string[], request: any) {
    const user = request?.user;
    return roles.includes(user?.roles);
  }
}
