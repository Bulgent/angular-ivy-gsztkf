import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { InputMaterials } from './inputMaterials.components/inputMaterials.component';
import { OutputMaterials } from './outputMaterials.components/outputMaterials.component';
import { TimesDilution } from './timesDilution.components/timesDilution.component';
import { Title } from './title.components/title.component';
import { CommonService } from './service/common.service';

@NgModule({
  imports: [BrowserModule, FormsModule],
  declarations: [
    AppComponent,
    InputMaterials,
    OutputMaterials,
    TimesDilution,
    Title,
  ],
  providers: [CommonService],
  bootstrap: [AppComponent],
})
export class AppModule {}
