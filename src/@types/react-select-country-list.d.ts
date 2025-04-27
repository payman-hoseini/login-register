// src/@types/react-select-country-list.d.ts

declare module 'react-select-country-list' {
    /** هر گزینه کشور */
    export interface CountryOption {
      label: string;
      value: string;
    }
  
    /** شیئی که countryList() برمی‌گرداند */
    export interface CountryList {
      /** بازگرداندن آرایه‌ای از گزینه‌های { label, value } */
      getData(): CountryOption[];
    }
  
    /** تابع پیش‌فرض: شیئی با متد getData */
    export default function countryList(): CountryList;
  }
  