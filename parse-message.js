const html = `קיבלתם הודעה חדשה<br>Jesus life: true<br>New Testament: true<br>Supernatural: false<br>Isaiah 53: false<br>Lawyers Case: false<br>BeforeYou (CD): true<br>Name: ilya test 3<br>Street: הללויה<br>House Number: 99<br>Apartment Number: 87<br>City: אלום<br>Phone Number: 09876567<br>Age Confirmation: true<br><br>----------------------------------------------------------<br><br><br>\n' +
    'If you believe this is a spam submission, please forward to <br><br><a href="https://webflow.com/dashboard/unsubscribeForm?t=9d1611c13a171d71632cc1a74a7c9f84c00fa695ae69f8c5b62cc127370aca2f&amp;s=5fa11abe42c4e96f4ed2984f&amp;sn=Medabrim&amp;e=zapier%40emailprocessing.site&amp;d=1685693874935">Unsubscribe</a> from notifications for this site.\n' +
    '\n' +
    '<br/><img src="https://x9x26.mjt.lu/oo/AMYAABl_xSUAAAAAAAAAARHR9jkAAAAAjncAAAAAABhTEABkeaW0AmffjtFsScKxq3Z10rbRfAAA7QM/d6ba69ad/e.gif" height="1" width="1" alt="" border="0" style="height:1px;width:1px;border:0;"/>\n`;

const processPhone = phone => {
  const digits = phone.replace(/\D/g,'')

  if (phone[0] === '+') return '+' + digits
  if (digits.length < 10) return `+972-${digits}`

  return `+${digits}`
}

export const parseMessage = message => {
  const order = message.replaceAll(/<br>/g, "\n")
  const parsedMessage = {
    books: [],
    description: order.replace(/<\/?[^>]+(>|$)/g, "")
  };

  for (let line of order.split("\n")) {
    const [key, value] = line.split(':');
    if (!key || !value) continue
    const trimmedKey = key.trim();
    const trimmedValue = value.trim();

    if (trimmedKey === 'Name') {
      parsedMessage.name = trimmedValue;
    } else if (trimmedKey === 'Street') {
      parsedMessage.street = trimmedValue;
    } else if (trimmedKey === 'House Number') {
      parsedMessage.houseNumber = parseInt(trimmedValue);
    } else if (trimmedKey === 'Apartment Number') {
      parsedMessage.apartmentNumber = parseInt(trimmedValue);
    } else if (trimmedKey === 'City') {
      parsedMessage.city = trimmedValue;
    } else if (trimmedKey === 'Phone Number') {
      parsedMessage.originalPhoneNumber = trimmedValue;
      parsedMessage.phoneNumber = processPhone(trimmedValue);
    } else if (trimmedKey === 'Age Confirmation') {
      parsedMessage.ageConfirmation = (trimmedValue.toLowerCase() === 'true');
    } else if (trimmedValue.toLowerCase() === 'true') { // true after the book name
      parsedMessage.books.push(trimmedKey)
    }
  }

  return parsedMessage;
};

