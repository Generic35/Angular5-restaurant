import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Feedback, ContactType } from '../shared/feedback';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  
  public feedbackForm: FormGroup;
  public feedback: Feedback;
  public contactType = ContactType;

  constructor(private fb: FormBuilder) { 
    this.createForm();
  }

  ngOnInit() {
  }

  createForm(): any {
    this.feedbackForm = this.fb.group({
      firstname: '',
      lastname: '',
      telnum: 0,
      email: '',
      agree: false,
      contacttype: 'None',
      message: ''
    });
  }

  onSubmit(){
    this.feedback = this.feedbackForm.value;
    console.log(this.feedbackForm.value, ' ', this.feedbackForm.status);
    this.feedbackForm.reset();
  }
}
