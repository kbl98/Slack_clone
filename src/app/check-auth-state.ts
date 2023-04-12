import { AngularFireAuth } from '@angular/fire/compat/auth';
import { first } from 'rxjs/operators';

export async function checkAuthState(authService: AngularFireAuth): Promise<boolean> {
  const currentUser = await authService.currentUser;
  return !!currentUser;
}