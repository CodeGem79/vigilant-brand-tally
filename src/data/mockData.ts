export interface Update {
  id: string;
  date: string;
  title: string;
  content: string;
}

export interface Comment {
  id: string;
  author: string;
  date: string;
  content: string;
}

export interface Petition {
  id: string;
  brand: string;
  title: string;
  description: string;
  supporters: number;
  status: 'active' | 'investigating' | 'resolved';
  createdAt: string;
  blogContent: string;
  updates: Update[];
  comments: Comment[];
}

export const mockPetitions: Petition[] = [
  {
    id: '1',
    brand: 'TechGiant Inc.',
    title: 'The 14-Day Refund: A Brand Wrong',
    description: 'Multiple consumers report systematic denial of legitimate 14-day refund requests, citing fabricated policy violations.',
    supporters: 847,
    status: 'investigating',
    createdAt: '2025-01-15',
    blogContent: `## Investigation Overview

Over the past three months, we've received 847 reports from consumers experiencing identical issues with TechGiant Inc.'s refund process. Despite clear adherence to the advertised 14-day money-back guarantee, customers are being systematically denied refunds through what appears to be a coordinated pattern of policy misinterpretation.

## The Pattern

1. **Initial Purchase**: Customers purchase products with clear 14-day guarantee
2. **Refund Request**: Within the 14-day window, refund requested
3. **False Rejection**: Company claims "policy violation" or "terms not met"
4. **Customer Service Loop**: Multiple escalations lead nowhere

## Evidence Collected

We have documented over 200 individual cases with timestamped evidence showing:
- Purchase confirmations
- Timely refund requests
- Contradictory company responses
- Financial impact on consumers

## What We're Demanding

1. Immediate processing of all legitimate pending refunds
2. Public acknowledgment of the issue
3. Policy clarification and transparency
4. Compensation for affected customers

The Brand Report will continue monitoring this situation and updating supporters as developments occur.`,
    updates: [
      {
        id: 'u1',
        date: '2025-02-10',
        title: 'Media Coverage Achieved',
        content: 'Major consumer rights publication picked up the story. Company PR department has acknowledged receipt of our concerns.'
      },
      {
        id: 'u2',
        date: '2025-01-28',
        title: 'Supporter Milestone: 500',
        content: 'Reached 500 supporters. Company has been officially notified of our investigation.'
      },
      {
        id: 'u3',
        date: '2025-01-15',
        title: 'Investigation Opened',
        content: 'TechGiant Inc. has been placed under formal observation. Evidence collection phase initiated.'
      }
    ],
    comments: [
      {
        id: 'c1',
        author: 'Sarah M.',
        date: '2025-02-12',
        content: 'This happened to me too! They kept saying I violated terms but never explained how. Thank you for investigating this.'
      },
      {
        id: 'c2',
        author: 'Mike R.',
        date: '2025-02-11',
        content: 'I spent weeks going in circles with customer service. Finally gave up. Glad someone is holding them accountable.'
      },
      {
        id: 'c3',
        author: 'Jennifer K.',
        date: '2025-02-09',
        content: 'Same experience here. The policy says 14 days, I requested on day 7, and they still denied it.'
      }
    ]
  },
  {
    id: '2',
    brand: 'FastShip Logistics',
    title: 'Hidden Subscription Charges',
    description: 'Consumers discovering unauthorized recurring charges months after one-time purchase, buried in checkout process.',
    supporters: 1203,
    status: 'active',
    createdAt: '2024-12-20',
    blogContent: `## The Hidden Subscription Trap

FastShip Logistics has been enrolling customers in a "Premium Membership" program without clear consent during checkout. What appears to be a one-time shipping fee is actually the first payment in a recurring monthly subscription.

## How It Works

The company uses a pre-checked box (in small print) during checkout that most customers don't notice. This box enrolls them in a $19.99/month membership that provides minimal value.

## Investigation Status

We are currently gathering evidence and working with affected consumers to document the full scope of this practice. Our legal team is reviewing whether this constitutes deceptive trade practices.`,
    updates: [
      {
        id: 'u4',
        date: '2025-02-01',
        title: 'Over 1,000 Supporters',
        content: 'Investigation gaining momentum. Multiple state attorney general offices have been contacted.'
      }
    ],
    comments: [
      {
        id: 'c4',
        author: 'Alex T.',
        date: '2025-02-08',
        content: 'I was charged for 4 months before I noticed! They refused to refund any of it.'
      }
    ]
  },
  {
    id: '3',
    brand: 'HomeComfort Co.',
    title: 'Warranty Claim Denials',
    description: 'Pattern of denying valid warranty claims on defective products, claiming "user error" without proper investigation.',
    supporters: 562,
    status: 'active',
    createdAt: '2025-02-01',
    blogContent: `## Systematic Warranty Failures

HomeComfort Co. advertises "comprehensive 2-year warranties" on all products, but our investigation reveals a troubling pattern of claim denials.

## The Issue

Consumers reporting legitimate product defects are being told their warranty is void due to "user error" or "improper maintenance" without any actual investigation or evidence. The company appears to be using these blanket denials to avoid honoring warranty obligations.

## Current Status

We're collecting documentation from affected consumers and reviewing the warranty terms against the company's actual practices.`,
    updates: [],
    comments: [
      {
        id: 'c5',
        author: 'Robert L.',
        date: '2025-02-11',
        content: 'My appliance failed after 8 months. They said I "misused" it but wouldn\'t explain how.'
      }
    ]
  }
];
