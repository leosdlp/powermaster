import { Injectable } from '@angular/core';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root',
})
export class AdminAuthService {
  private users: User[] = [];
  usersTemp: any = [];

  constructor() {}

  setApiUsers() {
    const newUsers = [];
    const temp = this.usersTemp;
    for (const user of temp) {
      newUsers.push({ id: user._id, username: user.username, password: user.password, email: user.email, benchPr: user.benchPr, squatPr: user.squatPr, deadliftPr: user.deadliftPr });
    }
    this.users = newUsers;
  }


  getUsers(): User[] {
    this.setApiUsers();
    return this.users;
  }

  isAdmin(): boolean {
    try {
      const currentUserString = localStorage.getItem('currentUser');
      if (currentUserString) {
        const currentUser = JSON.parse(currentUserString);
        if (currentUser && currentUser.username) {
          return currentUser.username === 'admin';
        }
      }
    } catch (error) {
      console.error('Error parsing user data:', error);
    }
    return false;
  }

  isLoggedIn(): boolean {
    const currentUserString = localStorage.getItem('currentUser');
    return !!currentUserString;
  }

  getUsername(){
    try {
      const currentUserString = localStorage.getItem('currentUser');
      if (currentUserString) {
        const currentUser = JSON.parse(currentUserString);
        return currentUser.username;
      }
    } catch (error) {
      console.error('Error parsing user data:', error);
    }
    return false;
  }

  getUserId(){
    try {
      const currentUserString = localStorage.getItem('currentUser');
      if (currentUserString) {
        const currentUser = JSON.parse(currentUserString);
        return currentUser.id;
      }
    } catch (error) {
      console.error('Error parsing user data:', error);
    }
    return false;
  }

  getUserPr(exercice: String){
    try {
      const currentUserString = localStorage.getItem('currentUser');
      if (currentUserString) {
        const currentUser = JSON.parse(currentUserString);
        if (exercice === 'bench') {
          return currentUser.benchPr;
        } else if (exercice === 'squat') {
          return currentUser.squatPr;
        } else if (exercice === 'deadlift') {
          return currentUser.deadliftPr;
        }
      }
    } catch (error) {
      console.error('Error parsing user data:', error);
    }
    return false;
  }

  register(id:string, username: string, password: string, verifPassword: string, email: string, benchPr: number, squatPr: number, deadliftPr: number): boolean {
    const existingUser = this.users.find((user) => user.username === username);
    if (existingUser && username === 'admin') {
      return false;
    }
    else{
      if (!existingUser && verifPassword == password){
        this.users.push({ id, username, password, email, benchPr, squatPr, deadliftPr });
        return true;
      }
    }
    return false;
  }

  login(username: string, password: string): boolean {
    const user = this.users.find(
      (u) => u.username === username && u.password === password
    );
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      return true;
    } else {
      return false;
    }
  }

  deleteUser(username: string, password: string): boolean {
    const userIndex = this.users.findIndex(
      (u) => u.username === username && u.password === password
    );
    if (userIndex !== -1) {
      this.users.splice(userIndex, 1);
      localStorage.removeItem('currentUser');
      return true;
    } else {
      return false;
    }
  }

  modifierUsername(nouveauNom: string): boolean {
    const currentUserString = localStorage.getItem('currentUser');
    if (currentUserString) {
      const currentUser = JSON.parse(currentUserString);
      currentUser.username = nouveauNom;
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
      return true;
    }
    return false;
  }

  modifierPassword(nouveauMdp: string): boolean {
      const currentUserString = localStorage.getItem('currentUser');
      if (currentUserString) {
        const currentUser = JSON.parse(currentUserString);
        currentUser.password = nouveauMdp;
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        return true;
      }
      return false;
  }

}
