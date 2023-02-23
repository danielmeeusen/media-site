export function composeEmail({ title, username, firstLine, clickBelow, link, button }) {
return(
`<!doctype html>
  <html lang="en-US">
  <head>
      <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
      <title>Reset Password</title>
      <meta name="Reset Password" content="Email request to reset password for your account.">
  </head>
  
  <body style="margin:0px; background-color:white; ">
    <table 
      cellspacing="0" 
      border="0" 
      cellpadding="0"
      width="100%" 
      bgcolor="white"
      style="font-family: Arial; font-size: 14px;"
     >
       <tr>
         <td>
           <table 
             style="background-color:white; max-width:1000px; margin:0 auto;" 
             width="100%" 
             align="center" 
            >
             <tr>
               <td style="height:10px;">&nbsp;</td>
             </tr>
             <tr>
               <td>
                 <table 
                   width="95%" 
                   align="center" 
                   style="max-width: 800px; text-align:center; background: lightgray; border-radius: 3px; box-shadow: 0 6px 18px 0 rgba(0,0,0,.06);"
                  >
                   <tr>
                     <td style="padding:0 18px;">
                       <h2>
                         ${title}
                       </h2>
                       
                       <span style="display:inline-block; vertical-align:middle; margin:auto; border-bottom:1px solid #cecece; width:300px;"></span>
                       
                       <p style="margin-bottom:20px">
                         Hey <b>${username}</b>,
                       </p>
                       
                       <p style="margin-bottom:20px">
                         ${firstLine}
                       </p>
                       
                       <p style="">
                        ${clickBelow}
                       </p>
                       
                       <a 
                         target="_blank" 
                         rel="noopener noreferrer" 
                         href="${link}"
                         style="background:MediumOrchid; text-decoration:none !important; font-weight:400; margin:20px; color:#fff; padding: 15px; display: inline-block; border-radius: 5px;"
                          >
                         ${button}
                       </a>
                       
                      <p>If that doesn't work, copy and paste the following link in your browser:</p>
                      <p><a style="color:MediumOrchid" href="${link}" target="_blank">
                      ${link}</a></p>
                       
                     </td>
                   </tr>
                   <tr>
                     <td style="height:40px;">&nbsp;</td>
                   </tr>
                 </table>
               </td>
             <tr>
               <td style="height:20px;">&nbsp;</td>
             </tr>
           </table>
         </td>
      </tr>
    </table>
    </body>
  </html>`);
};

