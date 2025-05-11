export const countries = [
  "Afghanistan", "Albania", 
  "Argentina", "Australia", "Austria",
  "Belgium",
  "Brazil", "Bulgaria",
  "Cambodia", "Canada",
  "Chile", "China",
  "Colombia", "Croatia", "Cuba",
  "Denmark",
  "Egypt",
  "Fiji",
  "Finland", "France",
  "Germany", "Greece",
  "Iceland", "India", "Indonesia", "Iran",
  "Iraq", "Ireland", "Israel", "Italy",
  "Japan",
  "Lebanon", "Liechtenstein",
  "Madagascar",
  "Maldives",
  "Mexico", "Monaco",
  "Mongolia", "Montenegro", "Morocco",
  "Netherlands", "New Zealand",
  "North Korea", "North Macedonia",
  "Norway",
  "Philippines", "Poland",
  "Portugal", "Russia",
  "San Marino", "Saudi Arabia",
  "Singapore",
  "Somalia", "South Africa", "South Korea",
  "Spain", "Sri Lanka", "Sweden",
  "Switzerland",
  "Thailand",
  "Turkey",
  "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay",
  "Vatican City", "Venezuela", "Vietnam"
];

export const allCountries = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola",
  "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan",
  "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus",
  "Belgium", "Belize", "Benin", "Bhutan", "Bolivia",
  "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria",
  "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada",
  "Cape Verde", "Central African Republic", "Chad", "Chile", "China",
  "Colombia", "Comoros", "Costa Rica", "Croatia", "Cuba",
  "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica",
  "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea",
  "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji",
  "Finland", "France", "Gabon", "Gambia", "Georgia",
  "Germany", "Ghana", "Greece", "Grenada", "Guatemala",
  "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras",
  "Hungary", "Iceland", "India", "Indonesia", "Iran",
  "Iraq", "Ireland", "Israel", "Italy", "Ivory Coast",
  "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya",
  "Kiribati", "Kuwait", "Kyrgyzstan", "Laos", "Latvia",
  "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein",
  "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia",
  "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania",
  "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco",
  "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar",
  "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand",
  "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia",
  "Norway", "Oman", "Pakistan", "Palau", "Panama",
  "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland",
  "Portugal", "Qatar", "Republic of the Congo", "Romania", "Russia",
  "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa",
  "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia",
  "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia",
  "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan",
  "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden",
  "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania",
  "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago",
  "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda",
  "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay",
  "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam",
  "Yemen", "Zambia", "Zimbabwe"
];

export const getNextCountry = (): string => {
  const seen = JSON.parse(localStorage.getItem('usedCountries') || '[]') as string[];
  const unused = countries.filter((c) => !seen.includes(c));

  // If we've used all countries, reset
  if (unused.length === 0) {
    localStorage.removeItem('usedCountries');
    return getNextCountry();
  }

  const next = unused[Math.floor(Math.random() * unused.length)];

  localStorage.setItem('usedCountries', JSON.stringify([...seen, next]));
  return next;
}