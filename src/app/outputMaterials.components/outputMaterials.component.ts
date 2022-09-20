import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CommonService } from '../service/common.service';

@Component({
  selector: 'outputMaterials',
  templateUrl: './outputMaterials.component.html',
  styleUrls: ['./outputMaterials.component.css'],
})
export class OutputMaterials implements OnInit, OnDestroy {
  public originalMaterialsPpm: string = '';
  public outputMaterialsPpm: string = '';
  public outputMaterialsVolume = '';
  public waterVolume = '';
  public originalVolume = '';

  private subscription!: Subscription;

  constructor(private commonService: CommonService) {}

  ngOnInit() {
    // イベント登録
    // サービスで共有しているデータが更新されたら発火されるイベントをキャッチする
    this.subscription = this.commonService.waterVolume$.subscribe((msg) => {
      this.waterVolume = this.commonService.getValue_waterVolume();
      this.originalVolume = this.commonService.getValue_originalVolume();
    });

    this.subscription = this.commonService.inputMaterialsPpm$.subscribe(
      (msg) => {
        if (msg == '') {
          this.originalMaterialsPpm = '';
        } else {
          this.originalMaterialsPpm = '(' + msg + 'ppm)';
        }
      }
    );
  }

  ngOnDestroy() {
    //  リソースリーク防止のため CommonService から subcribe したオブジェクトを破棄する
    this.subscription.unsubscribe();
  }

  onKey_outputMaterialsPpm(event: any) {
    // without type info
    this.outputMaterialsPpm = event.target.value;
    this.commonService.onNotifySharedDataChanged_outputMaterialsPpm(
      this.outputMaterialsPpm
    );
  }

  onKey_outputMaterialsVolume(event: any) {
    // without type info
    this.outputMaterialsVolume = event.target.value;
    this.commonService.onNotifySharedDataChanged_outputMaterialsVolume(
      this.outputMaterialsVolume
    );
  }
}
