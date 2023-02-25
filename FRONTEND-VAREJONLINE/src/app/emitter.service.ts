import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmmiterService {

  static clientesEmitter = new EventEmitter();
}