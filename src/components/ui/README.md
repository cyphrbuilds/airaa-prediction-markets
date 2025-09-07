# UI Components

## Badge Components

### SentimentBadge
Displays sentiment indicators (Bullish/Bearish) with appropriate color coding.

**Props:**
- `sentiment: Sentiment` - The sentiment value to display
- `className?: string` - Additional CSS classes

### ImpactBadge
Displays impact level indicators (High/Medium/Low Impact) with appropriate color coding.

**Props:**
- `impact: Impact` - The impact value to display
- `className?: string` - Additional CSS classes

## Usage

```tsx
import SentimentBadge from '@/components/ui/SentimentBadge';
import ImpactBadge from '@/components/ui/ImpactBadge';

<SentimentBadge sentiment={Sentiment.BULLISH} />
<ImpactBadge impact={Impact.HIGH} />
```

## Styling

Badge colors are defined in `/src/lib/constants.ts`:
- **Sentiment**: Green for Bullish, Red for Bearish
- **Impact**: Orange for High, Yellow for Medium, Gray for Low