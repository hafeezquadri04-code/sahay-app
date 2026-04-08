import connectDB from '../config/db.js';
import Scheme from '../models/Scheme.js';
import { MONGO_URI } from '../config/env.js';



const sampleSchemes = [
	{
		id: 'pm-jay',
		name: 'Ayushman Bharat PM-JAY',
		category: 'Health',
		shortDescription: 'Health protection cover for eligible families with cashless hospitalization.',
		description:
			'PM-JAY provides health insurance coverage for vulnerable families to access secondary and tertiary healthcare services through empanelled hospitals.',
		eligibilitySummary: 'Designed for low-income families listed in state beneficiary lists.',
		eligibility: [
			'Household must appear on the state beneficiary list.',
			'Family income under state-specified threshold where applicable.',
		],
		benefits: ['Cashless hospitalization', 'Coverage for select surgeries and treatments'],
		requiredDocuments: ['Identity proof', 'Address proof', 'Family details'],
		applicationProcess: ['Check eligibility with local authority', 'Apply through empanelled facility or state portal'],
		targetAudience: 'Low income and vulnerable households',
		benefitHighlight: 'Cashless hospitalization support',
		recommendedFor: { maxIncome: 300000 },
	},
	{
		id: 'national-scholarship-portal',
		name: 'National Scholarship Portal',
		category: 'Scholarship',
		shortDescription: 'Central portal aggregating scholarships for students.',
		description: 'Centralized scholarship application portal for multiple central and state schemes.',
		eligibilitySummary: 'Students enrolled in recognized educational institutions.',
		eligibility: ['Enrolled student', 'Income criteria as per scheme'],
		benefits: ['Tuition support', 'Maintenance allowance'],
		requiredDocuments: ['Aadhaar', 'Income certificate', 'Bonafide certificate'],
		applicationProcess: ['Create account', 'Fill application', 'Upload documents'],
		targetAudience: 'Students',
		benefitHighlight: 'Tuition and maintenance support',
		recommendedFor: { education: ['Undergraduate', 'Postgraduate'] },
	},
	{
		id: 'pm-kaushal-vikas-yojana',
		name: 'PM Kaushal Vikas Yojana',
		category: 'Skills',
		shortDescription: 'Short-term skill training and certification.',
		description: 'Skill training and assessment to improve employability across sectors.',
		eligibilitySummary: 'Youth and job seekers seeking vocational training.',
		eligibility: ['Age criteria per course', 'Basic education may be required'],
		benefits: ['Training', 'Certification'],
		requiredDocuments: ['Identity proof', 'Education certificates if required'],
		applicationProcess: ['Select course', 'Enroll at training centre'],
		targetAudience: 'Youth and job seekers',
		benefitHighlight: 'Skill certification',
		recommendedFor: { occupation: ['Student', 'Job Seeker'] },
	},
	{
		id: 'stand-up-india',
		name: 'Stand-Up India',
		category: 'Livelihood',
		shortDescription: 'Bank loans to promote entrepreneurship among underrepresented groups.',
		description: 'Financing support for greenfield enterprises owned by SC/ST/Women entrepreneurs.',
		eligibilitySummary: 'First-time entrepreneurs seeking bank financing.',
		eligibility: ['New enterprise', 'Eligible ownership criteria'],
		benefits: ['Bank loans', 'Enterprise support'],
		requiredDocuments: ['Business plan', 'Identity proof', 'Bank statements'],
		applicationProcess: ['Prepare proposal', 'Apply via bank or portal'],
		targetAudience: 'Aspiring entrepreneurs',
		benefitHighlight: 'Loan support for startups',
		recommendedFor: { occupation: ['Self Employed'] },
	},
	{
		id: 'niramaya-health-insurance',
		name: 'Niramaya Health Insurance',
		category: 'Disability Support',
		shortDescription: 'Affordable health insurance for persons with disabilities.',
		description: 'Support scheme for persons with disabilities to access medical care and therapies.',
		eligibilitySummary: 'Persons with certified disabilities.',
		eligibility: ['Disability certificate required', 'Residency criteria'],
		benefits: ['Insurance coverage', 'Medical support'],
		requiredDocuments: ['Disability certificate', 'Identity proof'],
		applicationProcess: ['Verify eligibility', 'Apply through state channel'],
		targetAudience: 'Persons with disabilities',
		benefitHighlight: 'Disability-focused health cover',
		recommendedFor: { disabilityStatus: 'Yes' },
	},
	{
		id: 'post-matric-scholarship-sc',
		name: 'Post Matric Scholarship for SC Students',
		category: 'Scholarship',
		shortDescription: 'Financial support for SC students pursuing education beyond Class 10.',
		description: 'Reduces the financial burden of post-matric education for eligible students.',
		eligibilitySummary: 'SC students continuing higher studies after Class 10 with income-based eligibility.',
		eligibility: [
			'Applicant should belong to Scheduled Caste category.',
			'Studying in a recognized post-matric course.',
			'Family income within prescribed threshold.',
		],
		benefits: ['Maintenance allowance', 'Tuition and compulsory fee support'],
		requiredDocuments: ['Caste certificate', 'Income certificate', 'Admission proof', 'Bank details'],
		applicationProcess: ['Check state guidelines', 'Fill application', 'Upload documents', 'Track approval'],
		targetAudience: 'SC students in higher education',
		benefitHighlight: 'Fee support',
		recommendedFor: {
			occupation: ['Student'],
			category: ['SC'],
			education: ['Undergraduate', 'Postgraduate', 'Diploma', 'Graduate'],
			maxIncome: 250000,
		},
	},
];

const seed = async () => {
	try {
		for (const s of sampleSchemes) {
			const exists = await Scheme.findOne({ id: s.id });
			if (!exists) {
				await Scheme.create(s);
				// eslint-disable-next-line no-console
				console.log(`Inserted scheme ${s.id}`);
			} else {
				// eslint-disable-next-line no-console
				console.log(`Scheme ${s.id} already exists, skipping`);
			}
		}
		// eslint-disable-next-line no-console
		console.log('Seeding complete');
	} catch (err) {
		// eslint-disable-next-line no-console
		console.error('Seeding failed', err);
		throw err;
	}
};

// When run directly as a standalone script
const isDirectRun =
	import.meta.url === `file://${process.argv[1]}` ||
	process.argv[1]?.endsWith('seedSchemes.js');

if (isDirectRun) {
	(async () => {
		await connectDB();
		await seed();
		process.exit(0);
	})().catch(() => process.exit(1));
}

export default seed;
