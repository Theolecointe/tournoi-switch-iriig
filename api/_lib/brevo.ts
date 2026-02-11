import * as brevo from '@getbrevo/brevo';

const apiInstance = new brevo.TransactionalEmailsApi();
apiInstance.setApiKey(brevo.TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_API_KEY!);

// IDs des templates transactionnels Brevo
const TEMPLATES = {
  CAPTAIN_CONFIRMATION: 1,  // Template de confirmation pour le capitaine
  TEAMMATE_INVITATION: 2    // Template d'invitation pour les coéquipiers
};

interface InvitationEmailParams {
  to: string;
  teamName: string;
  teamId: string;
  captainName: string;
}

interface CaptainEmailParams {
  to: string;
  teamName: string;
  teamId: string;
  captainName: string;
  invitedEmails: string[];
}

/**
 * Envoyer un email de confirmation au capitaine
 */
export const sendCaptainConfirmation = async ({ to, teamName, teamId, captainName, invitedEmails }: CaptainEmailParams): Promise<boolean> => {
  const sendSmtpEmail = new brevo.SendSmtpEmail();
  
  sendSmtpEmail.to = [{ email: to }];
  sendSmtpEmail.templateId = TEMPLATES.CAPTAIN_CONFIRMATION;
  
  // Variables disponibles dans le template Brevo
  sendSmtpEmail.params = {
    TEAM_NAME: teamName,
    CAPTAIN_NAME: captainName,
    TEAM_ID: teamId,
    INVITED_EMAILS: invitedEmails.join(', '),
    INVITED_COUNT: invitedEmails.length
  };

  try {
    await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log(`✅ Email confirmation capitaine envoyé à ${to}`);
    return true;
  } catch (error) {
    console.error(`❌ Erreur envoi email capitaine à ${to}:`, error);
    return false;
  }
};

/**
 * Envoyer un email d'invitation à un coéquipier
 */
export const sendTeammateInvitation = async ({ to, teamName, teamId, captainName }: InvitationEmailParams): Promise<boolean> => {
  const joinUrl = `${process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://tournoi-switch-iriig.vercel.app'}?join=${teamId}`;

  const sendSmtpEmail = new brevo.SendSmtpEmail();
  
  sendSmtpEmail.to = [{ email: to }];
  sendSmtpEmail.templateId = TEMPLATES.TEAMMATE_INVITATION;
  
  // Variables disponibles dans le template Brevo
  sendSmtpEmail.params = {
    TEAM_NAME: teamName,
    CAPTAIN_NAME: captainName,
    JOIN_URL: joinUrl,
    TEAM_ID: teamId
  };

  try {
    await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log(`✅ Email invitation envoyé à ${to}`);
    return true;
  } catch (error) {
    console.error(`❌ Erreur envoi email invitation à ${to}:`, error);
    return false;
  }
};

/**
 * Envoyer des invitations à plusieurs coéquipiers
 */
export const sendTeammateInvitations = async (
  emails: string[], 
  teamName: string, 
  teamId: string, 
  captainName: string
): Promise<{ sent: string[]; failed: string[] }> => {
  const results = { sent: [] as string[], failed: [] as string[] };

  for (const email of emails) {
    if (email && email.trim()) {
      const success = await sendTeammateInvitation({ 
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
