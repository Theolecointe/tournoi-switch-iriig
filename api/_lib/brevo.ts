import * as brevo from '@getbrevo/brevo';

const apiInstance = new brevo.TransactionalEmailsApi();
apiInstance.setApiKey(brevo.TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_API_KEY!);

interface EmailParams {
  to: string;
  teamName: string;
  teamId: string;
  captainName: string;
}

/**
 * Envoyer un email d'invitation à rejoindre une équipe
 */
export const sendTeamInvitation = async ({ to, teamName, teamId, captainName }: EmailParams): Promise<boolean> => {
  const joinUrl = `${process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://tournoi-switch-iriig.vercel.app'}?join=${teamId}`;

  const sendSmtpEmail = new brevo.SendSmtpEmail();
  
  sendSmtpEmail.subject = `🎮 Tu es invité(e) à rejoindre l'équipe "${teamName}" !`;
  sendSmtpEmail.to = [{ email: to }];
  sendSmtpEmail.sender = { 
    name: 'Tournoi Switch IRIIG', 
    email: 'noreply@iriig.fr' // Remplacez par votre email vérifié sur Brevo
  };
  sendSmtpEmail.htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; background-color: #1a1a2e; color: #ffffff; padding: 20px; }
        .container { max-width: 600px; margin: 0 auto; background-color: #16213e; border-radius: 16px; padding: 30px; }
        .header { text-align: center; margin-bottom: 30px; }
        .title { color: #e94560; font-size: 24px; margin: 0; }
        .content { line-height: 1.6; }
        .button { display: inline-block; background-color: #e94560; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 20px 0; }
        .footer { text-align: center; margin-top: 30px; font-size: 12px; color: #888; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1 class="title">🎮 Tournoi Mario Kart & Just Dance</h1>
        </div>
        <div class="content">
          <p>Salut !</p>
          <p><strong>${captainName}</strong> t'invite à rejoindre son équipe <strong>"${teamName}"</strong> pour le tournoi Switch de l'IRIIG !</p>
          <p>Clique sur le bouton ci-dessous pour rejoindre l'équipe :</p>
          <p style="text-align: center;">
            <a href="${joinUrl}" class="button">Rejoindre l'équipe</a>
          </p>
          <p>📍 <strong>Rappel :</strong> Le paiement de 5€ est à régler sur place.</p>
          <p>À très vite sur la piste ! 🏎️💃</p>
        </div>
        <div class="footer">
          <p>IRIIG - Lyon Part-Dieu</p>
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log(`✅ Email envoyé à ${to}`);
    return true;
  } catch (error) {
    console.error(`❌ Erreur envoi email à ${to}:`, error);
    return false;
  }
};

/**
 * Envoyer des invitations à plusieurs emails
 */
export const sendTeamInvitations = async (
  emails: string[], 
  teamName: string, 
  teamId: string, 
  captainName: string
): Promise<{ sent: string[]; failed: string[] }> => {
  const results = { sent: [] as string[], failed: [] as string[] };

  for (const email of emails) {
    if (email && email.trim()) {
      const success = await sendTeamInvitation({ 
        to: email.trim(), 
        teamName, 
        teamId, 
        captainName 
      });
      
      if (success) {
        results.sent.push(email);
      } else {
        results.failed.push(email);
      }
    }
  }

  return results;
};
