
  // ngOnChanges(changes: SimpleChanges): void {
  //   if (changes['parsedCode'] && this.parsedCode) {
  //     console.log('FormGeneratorComponent: Parsed code changed:', this.parsedCode);
  //     this.entryName = this.parsedCode.entryName || 'Dynamic Form';
  //     this.fields = this.parsedCode.parsedFields || this.parsedCode.fields || [];
  //     this.createForm();
  //     this.initializeTableData();
      
  //     if (this.initialValues) {
  //       console.log('FormGeneratorComponent: Applying initial values:', this.initialValues);
  //       this.applyInitialValues();
  //     }

  //     if (changes['readOnly']) {
  //       if (this.form) {
  //         if (this.readOnly) {
  //           this.form.disable();
  //         } else {
  //           this.form.enable();
  //         }
  //       }
  //     }

  //     this.updateFormControlsState();
  //   }
  // }


    // private updateFormControlsState(): void {
  //   if (this.form) {
  //     if (this.readOnly) {
  //       this.form.disable();
  //     } else {
  //       this.form.enable();
  //     }
  //   }
  // }


    // private applyInitialValues(): void {
  //   Object.keys(this.initialValues).forEach(key => {
  //     const control = this.form.get(key);
  //     if (control) {
  //       const field = this.fields.find(f => f.name === key);
  //       if (field && (field.type === 'STOPWATCH' || field.type === 'TIMER')) {
  //         control.setValue(this.initialValues[key]);
  //       } else {
  //         control.patchValue(this.initialValues[key]);
  //       }
  //     }
  //   });
  // }



  // onSave(): void {
  //   if (this.isFillable()) {
  //     const formData = this.prepareFormData();
  //     const structure = {
  //       entryName: this.parsedCode?.entryName || 'Untitled Form',
  //       fields: this.fields
  //     };
      
  //     if (this.isTemplate) {
  //       const defaultValues = this.getDefaultValues(this.fields);
  //       this.templateSaved.emit({ formData: defaultValues, structure });
  //     } else {
  //       this.instanceSubmitted.emit({ formData, structure });
  //     }
  //   } else {
  //     this.form.markAllAsTouched();
  //     this.snackBar.open('Please fill all required fields correctly.', 'Close', { duration: 3000 });
  //   }
  // }


    // onSubmit(): void {
  //   if (this.form.valid) {
  //     const formData = this.prepareFormData();
  //     const structure = {
  //       entryName: this.parsedCode?.entryName || 'Untitled Form',
  //       fields: this.fields
  //     };
  //     this.instanceSubmitted.emit({ formData, structure });
  //   } else {
  //     this.form.markAllAsTouched();
  //     console.log('Form is invalid:', this.form);
  //     this.snackBar.open('Please fill all required fields correctly.', 'Close', { duration: 3000 });
  //   }
  // }


      // initializeTableData(): void {
    //   this.fields.forEach(field => {
    //     if (field.type === 'TABLE') {
    //       this.updateTableDataSource(field.name);
    //     }
    //   });
    // }
  
    

    // getValidators(field: FieldConfig): ValidatorFn[] {
    //   const validators: ValidatorFn[] = [];
    
    //   if (field.required) {
    //     validators.push(Validators.required);
    //   }
    
    //   if (field.type.toUpperCase() === 'NUMBER' && field.options?.range) {
    //     if (field.options.range.min !== undefined) {
    //       validators.push(Validators.min(field.options.range.min));
    //     }
    //     if (field.options.range.max !== undefined) {
    //       validators.push(Validators.max(field.options.range.max));
    //     }
    //   }
    
    //   // Add custom validator for TEXT fields with maxLength
    //   if (field.type.toUpperCase() === 'TEXT' && field.options?.maxLength) {
    //     validators.push(Validators.maxLength(field.options.maxLength));
    //   }
    
    //   return validators;
    // }
    
    // getDefaultValue(field: FieldConfig): string | number | boolean | null {
    //   if (field.options?.default !== undefined) {
    //     return field.options.default;
    //   }
    
    //   switch (field.type.toUpperCase()) {
    //     case 'BOOLEAN':
    //       return false;
    //     case 'NUMBER':
    //     case 'SCALE':
    //       return null; // Changed to null to allow for empty initial state
    //     case 'DATE':
    //       return null;
    //     default:
    //       return '';
    //   }
    // }
    
  
    
    // createListFormArray(field: FieldConfig): FormArray {
    //   console.log('Creating list form array for field:', field.name);
    //   const minItems = field.options?.minItems || 1;
    //   const listArray = this.fb.array([] as AbstractControl[]);
    
    //   for (let i = 0; i < minItems; i++) {
    //     const itemGroup = this.createListItemGroup(field);
    //     listArray.push(itemGroup as unknown as AbstractControl);
    //   }
    
    //   return listArray;
    // }
  
      
  // createTableFormArray(field: FieldConfig): FormArray {
  //   const tableArray = this.fb.array([] as FormGroup[]);
  
  //   if (field.options?.columns) {
  //     const initialRow = this.createTableRowGroup(field);
  //     tableArray.push(initialRow);
      
  //     // Initialize the data source with the initial row
  //     this.initializeTableDataSource(field.name, [initialRow]);
  //   } else {
  //     console.error(`Missing columns for TABLE field: ${field.name}`);
  //   }
  
  //   return tableArray;
  // }
  