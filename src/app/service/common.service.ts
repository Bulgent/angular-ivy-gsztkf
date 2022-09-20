import { Injectable } from '@angular/core';
// イベント発火のための Subject を import
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class CommonService {
  private inputMaterialsPpm = new BehaviorSubject<string>('');
  private outputMaterialsPpm = new BehaviorSubject<string>('');
  private outputMaterialsVolume = new BehaviorSubject<string>('');
  private waterVolume = new BehaviorSubject<string>('');
  private originalVolume = new BehaviorSubject<string>('');

  public inputMaterialsPpm$ = this.inputMaterialsPpm.asObservable();
  public outputMaterialsPpm$ = this.outputMaterialsPpm.asObservable();
  public outputMaterialsVolume$ = this.outputMaterialsVolume.asObservable();
  public waterVolume$ = this.waterVolume.asObservable();
  public originalVolume$ = this.originalVolume.asObservable();

  constructor() {}

  public onNotifySharedDataChanged_inputMaterialsPpm(updateed: string) {
    this.inputMaterialsPpm.next(updateed);
  }

  public onNotifySharedDataChanged_outputMaterialsPpm(updateed: string) {
    this.outputMaterialsPpm.next(updateed);
  }

  public onNotifySharedDataChanged_outputMaterialsVolume(updateed: string) {
    this.outputMaterialsVolume.next(updateed);
  }

  public onNotifySharedDataChanged_waterVolume(updateed: string) {
    this.waterVolume.next(updateed);
  }

  public onNotifySharedDataChanged_originalVolume(updateed: string) {
    this.originalVolume.next(updateed);
  }

  public getValue_inputMaterialsPpm() {
    return this.inputMaterialsPpm.getValue();
  }

  public getValue_outputMaterialsPpm() {
    return this.outputMaterialsPpm.getValue();
  }

  public getValue_outputMaterialsVolume() {
    return this.outputMaterialsVolume.getValue();
  }

  public getValue_waterVolume() {
    return this.waterVolume.getValue();
  }

  public getValue_originalVolume() {
    return this.originalVolume.getValue();
  }
}
