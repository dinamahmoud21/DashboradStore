export   class loginphoto {
    key!: string;
    name!: string;
    url!: string;
    file: File;
    progress?: number;
    createdAt:Date=new Date()
  
    constructor(file: File) {
      this.file = file;
    }
  }