export interface Contact {
  id: string;
  firstName: string;
  lastName: string | null;
  company: string | null;
  phoneNumbers: string[];
  emails: string[];
}
