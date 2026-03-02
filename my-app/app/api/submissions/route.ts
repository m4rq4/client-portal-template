import type { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, title, description, clientName } = body;

    if (!type || !title) {
      return Response.json(
        { error: 'Type and title are required' },
        { status: 400 }
      );
    }

    // Create submission record
    const submission = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      client: clientName || 'Client',
      type,
      title,
      description,
      status: 'pending'
    };

    // Log submission (in production, save to database)
    console.log('New submission:', submission);

    // Send notification to Kirby (iMessage)
    // Note: This requires the iMessage CLI to be available on the server
    const notificationMsg = `📬 NEW CLIENT SUBMISSION\n\nFrom: ${submission.client}\nType: ${type.toUpperCase()}\n\nTitle: ${title}\n\n${description || 'No details provided'}`;

    // Attempt to send iMessage notification
    try {
      const { exec } = require('child_process');
      const KIRBY_PHONE = process.env.KIRBY_PHONE || '7133980947';
      
      exec(`imsg send --to "+1${KIRBY_PHONE}" --text "${notificationMsg.replace(/"/g, '\\"')}"`, 
        (err: Error | null) => {
          if (err) console.error('Failed to send iMessage notification:', err);
        }
      );
    } catch (notifyError) {
      console.error('Notification error:', notifyError);
    }

    return Response.json({ 
      success: true, 
      submissionId: submission.id 
    });

  } catch (error) {
    console.error('Submission error:', error);
    return Response.json(
      { error: 'Failed to process submission' },
      { status: 500 }
    );
  }
}
