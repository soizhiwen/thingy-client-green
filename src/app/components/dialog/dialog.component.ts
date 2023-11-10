import { Component, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  title: string;
  subtitle: string;
  imageTitle: string;
  inputFields: InputField[];
  buttonText: string;
}

export interface InputField {
  id: string;
  placeholder: string;
  formControl: FormControl;
  type: 'text' | 'date';
}

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) { }
}
