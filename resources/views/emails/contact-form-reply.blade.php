<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>{{ $reply->subject }}</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
        }
        .header {
            padding: 20px 0;
            border-bottom: 1px solid #eee;
        }
        .content {
            padding: 20px 0;
        }
        .footer {
            padding: 20px 0;
            border-top: 1px solid #eee;
            font-size: 12px;
            color: #777;
        }
    </style>
</head>
<body>
    <div class="header">
        <h2>{{ $reply->subject }}</h2>
    </div>
    
    <div class="content">
        <p>Dear {{ $contactForm->name }},</p>
        
        <div>
            {!! nl2br(e($reply->message)) !!}
        </div>
        
        <p>Best regards,<br>
        {{ $reply->repliedBy->name ?? 'The Team' }}</p>
    </div>
    
    <div class="footer">
        <p>This is in response to your message sent on {{ $contactForm->created_at->format('F j, Y') }} regarding "{{ $contactForm->subject }}".</p>
    </div>
</body>
</html>