import {parseMessage} from './parse-message.js'

const html = `קיבלתם הודעה חדשה<br>Jesus life: true<br>New Testament: true<br>Supernatural: false<br>Isaiah 53: false<br>Lawyers Case: false<br>BeforeYou (CD): true<br>Name: ilya test 3<br>Street: הללויה<br>House Number: 99<br>Apartment Number: 87<br>City: אלום<br>Phone Number: 09876567<br>Age Confirmation: true<br><br>----------------------------------------------------------<br><br><br>\n' +
    'If you believe this is a spam submission, please forward to <br><br><a href="https://webflow.com/dashboard/unsubscribeForm?t=9d1611c13a171d71632cc1a74a7c9f84c00fa695ae69f8c5b62cc127370aca2f&amp;s=5fa11abe42c4e96f4ed2984f&amp;sn=Medabrim&amp;e=zapier%40emailprocessing.site&amp;d=1685693874935">Unsubscribe</a> from notifications for this site.\n' +
    '\n' +
    '<br/><img src="https://x9x26.mjt.lu/oo/AMYAABl_xSUAAAAAAAAAARHR9jkAAAAAjncAAAAAABhTEABkeaW0AmffjtFsScKxq3Z10rbRfAAA7QM/d6ba69ad/e.gif" height="1" width="1" alt="" border="0" style="height:1px;width:1px;border:0;"/>\n`;

export const createClickupTask  = async (message, token) => {
  const order = parseMessage(message)
  console.log(order)
  const query = new URLSearchParams({
    custom_task_ids: 'false',
    team_id: '25619459'
  }).toString();

  const listId = '900300392024';
  const resp = await fetch(
    `https://api.clickup.com/api/v2/list/${listId}/task?${query}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify({
        name: order.name,
        description: order.description,
        assignees: [60846743],// 37723939 - yoni
        space_id: '60890357',
        project_id: '126807274',
        check_required_custom_fields: true,
        custom_fields: [
          {
            id: '64a6d40a-cc32-476a-8c09-0fe528a431be',
            value: 'e8c6e78a-b052-4096-b659-c508194e0c99'
          },
          {
            id: '00dd908b-edc7-4a76-b4a7-dd6bfaab97e6',
            value: 'c71e2b6b-4c35-4ddd-8bee-2938bfd4bd26'
          },

          {
            id: 'fb15088b-428e-42b4-8395-c8c5c77191e6',
            value: order.originalPhoneNumber,
          },
          {
            id: 'fefaf24e-2989-4303-9de4-aa64b30dca10',
            value: order.phoneNumber
          },
          {
            id: 'd93377bb-3a3d-481c-a77d-7b943e10a195',
            value: order.books.join(", "),
          },
          {
            id: '1fa36032-eb69-491e-8538-b5884c6c1b64',
            value: order.city
          },
          {
            id: '35e256a4-7b0e-4a5a-bc34-d268934556aa',
            value: {
              location:{
                lat: 1,
                lng: 1
              },
              formatted_address: `${order.street}, ${order.houseNumber} / ${order.apartmentNumber}`,
            },
          },
          {
            id: '69ff832c-0fcb-4364-97ae-ab8cad31420a',
            value: order.ageConfirmation.toString(),
          }
        ]
      })
    }
  );

  return await resp.json()
}
