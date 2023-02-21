import { JwtResponse } from './jwt-response.model';

describe('JwtResponse', () => {
  it('should create an instance', () => {
    expect(new JwtResponse("type","token","username",["role"])).toBeTruthy();
  });
});
