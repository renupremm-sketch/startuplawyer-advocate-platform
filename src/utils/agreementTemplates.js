// Comprehensive Legal Agreement Templates

const numberToWords = (num) => {
    if (!num || isNaN(num)) return '';

    const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
    const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
    const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];

    num = parseInt(num);

    if (num < 10) return ones[num];
    if (num >= 10 && num < 20) return teens[num - 10];
    if (num >= 20 && num < 100) return tens[Math.floor(num / 10)] + (num % 10 ? ' ' + ones[num % 10] : '');
    if (num >= 100 && num < 1000) return ones[Math.floor(num / 100)] + ' Hundred' + (num % 100 ? ' ' + numberToWords(num % 100) : '');
    if (num >= 1000 && num < 100000) return numberToWords(Math.floor(num / 1000)) + ' Thousand' + (num % 1000 ? ' ' + numberToWords(num % 1000) : '');
    if (num >= 100000) return numberToWords(Math.floor(num / 100000)) + ' Lakh' + (num % 100000 ? ' ' + numberToWords(num % 100000) : '');
    return num.toString();
};

export const generateEmploymentAgreement = (formData) => {
    const today = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
    const salaryWords = numberToWords(formData.monthlySalary);

    return `## EMPLOYMENT AGREEMENT

This Employment Agreement (hereinafter referred to as the "Agreement") is made and entered into on this **${today}**

**BETWEEN:**

**${formData.employerName || '[COMPANY NAME]'}**, a company incorporated under the provisions of the Companies Act, 2013, having its registered office at [Insert Registered Office Address], (hereinafter referred to as the "Employer," which expression shall, unless repugnant to the context or meaning thereof, include its successors and assigns) of the **FIRST PART**;

**AND**

**${formData.employeeName || '[EMPLOYEE NAME]'}**, residing at [Insert Employee's Residential Address], (hereinafter referred to as the "Employee," which expression shall, unless repugnant to the context or meaning thereof, include heirs, executors, and administrators) of the **SECOND PART**.

(The Employer and the Employee are hereinafter collectively referred to as the "Parties" and individually as a "Party")

**WHEREAS:**

A. The Employer is engaged in the business of [briefly describe ${formData.employerName || 'Company'}'s business activities].
B. The Employee represents that they possess the requisite qualifications, skills, and experience to perform the duties and responsibilities of the position of **${formData.jobTitle || 'the designated position'}**.
C. The Employer desires to employ the Employee, and the Employee desires to be employed by the Employer, on the terms and conditions hereinafter appearing.

**NOW, THEREFORE, in consideration of the mutual covenants and promises contained herein and other good and valuable consideration, the receipt and sufficiency of which are hereby acknowledged, the Parties hereto agree as follows:**

---

### 1. DEFINITIONS

1.1. **"Confidential Information"** shall mean any and all non-public, proprietary information, data, knowledge, trade secrets, business methods, processes, financial information, customer lists, client data, technical data, designs, plans, strategies, and any other information, whether written, oral, or electronic, belonging to or relating to the Employer's business or clients, which the Employee may obtain or develop during the course of employment.

1.2. **"Intellectual Property"** shall mean any and all inventions, discoveries, improvements, processes, methods, designs, computer programs, software, databases, works of authorship, trademarks, service marks, trade names, logos, concepts, ideas, and any other intellectual property rights, whether patentable or not, created, conceived, developed, or reduced to practice by the Employee during the course of employment.

1.3. **"Working Hours"** shall refer to the stipulated hours of work as defined in Clause 4.1, subject to modifications as per business requirements and applicable laws.

---

### 2. EMPLOYMENT COMMENCEMENT AND POSITION

2.1. **Commencement Date:** The Employee's employment with the Employer shall commence on **${formData.startDate || '[Start Date]'}** (hereinafter referred to as the "Start Date").

2.2. **Position:** The Employee is hereby appointed to the position of **${formData.jobTitle || 'Project Manager'}**.

2.3. **Work Location:** The Employee's primary place of work shall be in **${formData.workLocation || '[Location]'}**. The Employer reserves the right to require the Employee to work at other locations in India or abroad, temporarily or permanently, depending on business requirements, with reasonable notice.

2.4. **Job Description:** The Employee shall perform the duties and responsibilities generally associated with the position of ${formData.jobTitle || 'Project Manager'} and as may be specifically assigned by the Employer from time to time. The Employee shall report to the designated superior as per the organizational structure.

---

### 3. COMPENSATION AND BENEFITS

3.1. **Salary:** The Employee shall be paid a gross monthly salary of **INR ${formData.monthlySalary || '[Amount]'}/- (Rupees ${salaryWords || '[In Words]'} Only)**. This gross salary includes Basic Pay, House Rent Allowance (HRA), Special Allowance, and other components as per the Employer's salary structure, details of which will be provided separately.

3.2. **Deductions:** All statutory and non-statutory deductions, including but not limited to, Provident Fund (PF), Employee State Insurance (ESI, if applicable), Professional Tax, and Income Tax, shall be made from the Employee's gross salary as per applicable laws and Employer policies.

3.3. **Performance Reviews and Salary Revisions:** The Employee's performance will be reviewed periodically, at least once a year. Salary revisions, if any, shall be at the sole discretion of the Employer and tied to performance, market conditions, and overall company profitability.

3.4. **Benefits:** The Employee shall be eligible for such other benefits as may be generally applicable to employees of the Employer of a similar grade and position, including:
    a. **Provident Fund (PF):** Contributions to the Employees' Provident Fund as per the Employees' Provident Funds and Miscellaneous Provisions Act, 1952.
    b. **Gratuity:** Eligibility for Gratuity as per the Payment of Gratuity Act, 1972, subject to fulfilling the qualifying conditions.
    c. **Insurance:** Group Medical Insurance as per Employer's policy (if applicable).
    d. **Other Benefits:** Any other benefits, allowances, or perquisites as may be notified by the Employer from time to time.

---

### 4. WORKING HOURS

4.1. The Employee's normal working hours shall be **9:00 AM to 6:00 PM (Monday to Friday)**, with a lunch break of one hour, amounting to 45 hours per week.

4.2. The Employee acknowledges that, due to the nature of the ${formData.jobTitle || 'designated'} role, they may be required to work beyond normal working hours, including weekends or public holidays, as and when necessitated by business requirements, for which no additional remuneration shall be payable. The Employer shall endeavor to provide compensatory off as per applicable internal policies.

---

### 5. LEAVE POLICIES

5.1. The Employee shall be entitled to the following types of leave, as per the Employer's Leave Policy and in compliance with applicable Shops and Establishments Act:
    a. **Casual Leave:** 7 days per annum
    b. **Sick Leave:** 12 days per annum
    c. **Earned Leave/Privilege Leave:** 18 days per annum, accruable from the date of joining
    d. **Public Holidays:** As declared by the Employer and the Government
    e. **Maternity/Paternity Leave:** As per the Maternity Benefit Act, 1961 (as amended), and the Employer's policy

5.2. All leave applications must be submitted in advance and approved by the reporting manager/HR Department. Unavailed leave shall be dealt with as per the Employer's Leave Encashment Policy.

---

### 6. CONFIDENTIALITY

6.1. The Employee acknowledges that during the course of employment, they will have access to and will be entrusted with Confidential Information concerning the Employer's business, finances, operations, clients, employees, and technology.

6.2. The Employee undertakes and agrees to:
    a. Keep all Confidential Information strictly confidential and not disclose, publish, or disseminate it to any third party at any time, either during or after termination of employment.
    b. Use Confidential Information solely for the benefit of the Employer.
    c. Exercise the same degree of care to protect Confidential Information as they would apply to their own confidential information.
    d. Return all Confidential Information to the Employer upon termination of employment or at any time upon request.

6.3. This obligation of confidentiality shall survive the termination of this Agreement indefinitely.

---

### 7. INTELLECTUAL PROPERTY

7.1. The Employee acknowledges and agrees that all Intellectual Property created, conceived, developed, or reduced to practice during the course of employment shall be the sole and exclusive property of the Employer.

7.2. The Employee hereby assigns and agrees to assign to the Employer all rights, title, and interest in and to such Intellectual Property.

7.3. The Employee further agrees to execute any and all documents, including applications for patents, copyrights, trademarks, assignments, and other instruments, as may be required by the Employer to perfect, register, and enforce its rights in the Intellectual Property.

7.4. The Employee warrants that any work product delivered to the Employer shall be their original work and shall not infringe upon the intellectual property rights of any third party.

---

### 8. NON-COMPETE AND NON-SOLICITATION

8.1. **Non-Compete (During Employment):** During the term of employment with the Employer, the Employee shall not directly or indirectly engage in any business, occupation, or activity that is competitive with the business of the Employer.

8.2. **Non-Compete (Post-Employment):** For a period of **6 (six) months** commencing from the date of cessation of employment, the Employee shall not, within the geographical limits of **${formData.workLocation || 'India'}**, directly or indirectly engage in, be employed by, consult for, or be associated with any entity whose business is directly competitive with the Employer's business.

8.3. **Non-Solicitation (Post-Employment):** For a period of **12 (twelve) months** commencing from the date of cessation of employment, the Employee shall not directly or indirectly:
    a. Solicit or attempt to solicit, divert, or appropriate any client, customer, or business partner of the Employer.
    b. Induce or attempt to induce any employee of the Employer to leave their employment.

---

### 9. TERMINATION OF EMPLOYMENT

9.1. **Probation Period:** The Employee shall be on probation for **3 (three) months** from the Start Date. During this period, either party may terminate employment with **7 (seven) days' notice**.

9.2. **Termination by Employer (With Cause):** The Employer may terminate the Employee's employment immediately without notice or payment in lieu of notice in the event of:
    a. Gross misconduct, insubordination, serious dereliction of duty, or persistent poor performance after due warning.
    b. Breach of any terms of this Agreement, including confidentiality and intellectual property clauses.
    c. Fraud, dishonesty, theft, or any act involving moral turpitude.
    d. Conviction for any criminal offense.
    e. Willful damage or destruction of Employer's property.
    f. Violation of any Employer policies and procedures.

9.3. **Termination by Employer (Without Cause):** The Employer may terminate employment by giving **2 (two) months' prior written notice** or by paying salary in lieu thereof.

9.4. **Termination by Employee:** The Employee may terminate employment by giving **2 (two) months' prior written notice** to the Employer.

9.5. **Notice Pay:** If either party fails to provide the required notice period, they shall pay the other party an amount equivalent to the salary for the notice period not served.

9.6. **Garden Leave:** At the Employer's discretion, during any notice period, the Employer may place the Employee on Garden Leave, during which the Employee shall continue to receive full salary but shall not attend the Employer's premises or contact clients/employees.

9.7. **Final Settlement:** Upon termination, all outstanding dues including salary, earned leave encashment (if applicable), gratuity (if eligible), and other benefits shall be settled within statutory timelines as per the Payment of Wages Act, 1936. The Employee shall return all Employer property before receiving final settlement.

---

### 10. DISPUTE RESOLUTION

10.1. Any dispute arising out of or relating to this Agreement shall first be attempted to be resolved amicably through good faith negotiations between the Parties.

10.2. If the dispute cannot be resolved within **30 (thirty) days**, it shall be referred to arbitration in accordance with the Arbitration and Conciliation Act, 1996.

10.3. The Arbitration Tribunal shall consist of a sole arbitrator mutually appointed by the Parties. If the Parties fail to agree within 15 days, the appointment shall be made as per the Arbitration and Conciliation Act, 1996.

10.4. The seat and venue of arbitration shall be **${formData.workLocation || '[City]'}**.

10.5. The language of arbitration shall be English.

10.6. The arbitrator's award shall be final and binding on both Parties.

---

### 11. GOVERNING LAW AND JURISDICTION

11.1. This Agreement shall be governed by and construed in accordance with the laws of India.

11.2. Subject to the arbitration clause, the  Courts in **${formData.workLocation || '[City]'}** shall have exclusive jurisdiction.

---

### 12. GENERAL PROVISIONS

12.1. **Entire Agreement:** This Agreement constitutes the entire agreement between the Parties and supersedes all prior discussions, negotiations, and agreements.

12.2. **Amendments:** No amendment shall be effective unless made in writing and signed by both Parties.

12.3. **Severability:** If any provision is held invalid or unenforceable, the remaining provisions shall remain in full force and effect.

12.4. **Assignment:** The Employee may not assign any rights or obligations under this Agreement without the Employer's prior written consent. The Employer may assign this Agreement to any successor or affiliate.

12.5. **Notices:** All notices shall be in writing and delivered by hand, registered mail, or email with confirmation of receipt.

12.6. **Compliance with Policies:** The Employee agrees to abide by all policies, rules, and regulations of the Employer, whether existing or implemented during employment.

12.7. **Statutory Compliance:** This Agreement is subject to all applicable laws in India, including but not limited to the Shops and Establishments Act, Employees' Provident Funds Act, 1952, Employees' State Insurance Act, 1948, Payment of Wages Act, 1936, Payment of Gratuity Act, 1972, Maternity Benefit Act, 1961, and other relevant labor laws.

---

**IN WITNESS WHEREOF,** the Parties have executed this Agreement on the day and year first above written.

---

**FOR ${formData.employerName || '[COMPANY NAME]'}**

___________________________
[Name of Authorized Signatory]
[Designation]
(Employer)

**WITNESSES:**

1. Signature: ___________________________
   Name: [Witness 1 Name]
   Address: [Witness 1 Address]

2. Signature: ___________________________
   Name: [Witness 2 Name]
   Address: [Witness 2 Address]

---

**${formData.employeeName || '[EMPLOYEE NAME]'}**

___________________________
(Employee)

**WITNESSES:**

1. Signature: ___________________________
   Name: [Witness 1 Name]
   Address: [Witness 1 Address]

2. Signature: ___________________________
   Name: [Witness 2 Name]
   Address: [Witness 2 Address]

---

**LEGAL NOTES:**

• **Stamp Duty:** This Agreement should be printed on non-judicial stamp paper of appropriate value as per the Indian Stamp Act, 1899, and applicable State Stamp Act. The value varies by state. Consult a local legal professional for the exact amount.

• **Registration:** Generally, employment agreements do not require mandatory registration. However, keep duly executed copies with both parties.

• **Legal Advice:** This template is for informational purposes only. It is strongly recommended to consult with a qualified legal professional to customize this agreement for specific needs and ensure compliance with all prevailing central and state-specific labor laws.

• **Non-Compete Clause:** The enforceability of post-termination non-compete clauses can be complex in India and requires careful drafting. Consult legal counsel for specific circumstances.

---

*Generated by LexMind AI - Advocate Platform*
*This is a legally binding document. Review all terms carefully before execution.*`;
};

export const generateRentalAgreement = (formData) => {
    const today = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
    const rentWords = numberToWords(formData.monthlyRent);
    const depositWords = numberToWords(formData.securityDeposit);

    // Calculate end date (11 months from start date)
    let endDate = '[End Date]';
    if (formData.startDate) {
        const start = new Date(formData.startDate);
        start.setMonth(start.getMonth() + 11);
        endDate = start.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
    }

    return `## RENTAL/LEASE AGREEMENT

This Rental Agreement is made and entered into on this **${today}**

**BETWEEN:**

**${formData.landlordName || '[LANDLORD NAME]'}** (Aadhaar No.: ____________), residing at [Landlord's Complete Address], hereinafter referred to as the "LANDLORD" (which expression shall, unless repugnant to the context, include heirs, executors, administrators, and assigns) of the **FIRST PART**;

**AND**

**${formData.tenantName || '[TENANT NAME]'}** (Aadhaar No.: ____________), presently residing at [Tenant's Address], hereinafter referred to as the "TENANT" (which expression shall, unless repugnant to the context, include heirs, executors, administrators, and assigns) of the **SECOND PART**.

(The Landlord and Tenant are collectively referred to as "Parties" and individually as "Party")

**WHEREAS:**

A. The Landlord is the absolute and lawful owner in possession of the property more particularly described in Schedule A hereinafter.
B. The Tenant is desirous of taking the said property on lease/rent for residential purposes only.
C. The Landlord agrees to let out the said property to the Tenant, and the Tenant agrees to take the same on lease on the terms and conditions hereinafter appearing.

**NOW, THEREFORE, in consideration of the mutual covenants, terms, and conditions set forth herein, and for other good and valuable consideration, the receipt and sufficiency of which are hereby acknowledged, the Parties agree as follows:**

---

### SCHEDULE A - PROPERTY DETAILS

**The Scheduled Property:**
${formData.propertyAddress || '[Complete Property Address including House/Flat Number, Floor, Building Name/Number, Street Name, Area/Locality, City, District, State, PIN Code]'}

**Description:** Residential property comprising of [specify: 1BHK/2BHK/3BHK/Villa/Independent House] with [specify amenities, e.g., balcony, parking, common areas].

**Boundaries:**
- East: __________________
- West: __________________
- North: __________________
- South: __________________

---

### 1. TERM OF LEASE

1.1. **Lease Period:** This Agreement shall be for a period of **11 (Eleven) months** commencing from **${formData.startDate || '[Start Date]'}** and ending on **${endDate}**.

1.2. **Lock-in Period:** Initial **6 (six) months** constitute a lock-in period during which neither party may terminate this Agreement except for material breach.

1.3. **Renewal:** This Agreement may be renewed upon mutual written consent at the expiry of the initial term, with revised terms including rent escalation as mutually agreed.

---

### 2. RENT AND OTHER PAYMENTS

2.1. **Monthly Rent:** The Tenant shall pay to the Landlord a monthly rent of **INR ${formData.monthlyRent || '[Amount]'}/- (Rupees ${rentWords || '[In Words]'} Only)** for the demised premises.

2.2. **Due Date:** Monthly rent shall be payable on or before the **5th day of each calendar month** in advance.

2.3. **Mode of Payment:** Payment shall be made by:
    a. Bank transfer to Account No: ____________, IFSC: ____________, [Bank Name & Branch]
    OR
    b. As mutually agreed in writing between the Parties.

2.4. **Late Payment Penalty:** If rent payment is delayed beyond **10 (ten) days** from the due date, the Tenant shall pay a late fee of **INR 100/- (Rupees One Hundred Only) per day** of delay.

2.5. **Rent Escalation:** [Optional: The monthly rent shall be increased by __% annually, or as mutually agreed at the time of renewal.]

---

### 3. SECURITY DEPOSIT

3.1. **Amount:** The Tenant shall pay to the Landlord a refundable interest-free security deposit of **INR ${formData.securityDeposit || '[Amount]'}/- (Rupees ${depositWords || '[In Words]'} Only)** at the time of execution of this Agreement.

3.2. **Purpose:** The security deposit shall serve as security for the due performance and observance of all the terms and conditions of this Agreement by the Tenant.

3.3. **Refund:** The security deposit shall be refunded to the Tenant within **30 (thirty) days** from the date of vacating the premises, subject to:
    a. Satisfactory inspection of the property by the Landlord;
    b. Deduction of any unpaid rent, electricity, water, or other utility bills;
    c. Deduction for any damages to the property beyond normal wear and tear;
    d. Proper handover of keys and all fixtures and fittings in good working condition.

3.4. **No Interest:** The security deposit shall not carry any interest.

---

### 4. UTILITIES AND MAINTENANCE CHARGES

4.1. **Utilities Borne by Tenant:** The Tenant shall pay for all consumption charges including:
    a. Electricity charges
    b. Water charges
    c. Gas/LPG charges
    d. Internet/Cable/DTH charges
    e. Any other utility charges pertaining to the property

4.2. **Maintenance Charges:** [Specify: Monthly maintenance charges of INR ___/- shall be paid by Tenant OR included in rent OR borne by Landlord.]

4.3. **Property Tax:** Property tax and other statutory charges levied on the property by the Government or local authorities shall be borne by the **Landlord**.

---

### 5. OBLIGATIONS OF THE LANDLORD

5.1. The Landlord shall:
    a. Ensure peaceful and quiet possession of the property to the Tenant.
    b. Maintain the structural integrity of the building, including roof, walls, and foundation.
    c. Ensure availability and proper functioning of basic utilities (water supply, electricity connection).
    d. Pay all property taxes and statutory charges levied on the property.
    e. Not disturb the Tenant's possession during the lease term except for necessary repairs after reasonable notice.
    f. Provide a rent receipt for each payment made by the Tenant.

---

### 6. OBLIGATIONS OF THE TENANT

6.1. The Tenant shall:
    a. Pay the monthly rent punctually on the due date.
    b. Use the property strictly for residential purposes only.
    c. Maintain the property in good and tenantable condition.
    d. Not cause any nuisance, annoyance, or disturbance to neighbors or co-residents.
    e. Not make any structural alterations, additions, or modifications without prior written consent of the Landlord.
    f. Not sublet, assign, or part with possession of the property or any part thereof to any third party.
    g. Allow the Landlord or authorized agents to inspect the property upon reasonable notice (at least 24 hours).
    h. Comply with all applicable laws, rules, regulations, and bye-laws of local authorities and resident welfare associations.
    i. Keep the property adequately insured (if agreed upon).
    j. Vacate and hand over vacant possession of the property on or before the expiry/termination of the lease.
    k. Inform the Landlord immediately in case of any defect or damage requiring major repairs.

---

### 7. MAINTENANCE AND REPAIRS

7.1. **Minor Repairs:** Day-to-day minor repairs and maintenance (e.g., replacement of light bulbs, tap washers, minor plumbing issues) shall be the responsibility of the **Tenant**.

7.2. **Major Repairs:** Major structural repairs (e.g., roof leakage, foundation issues, structural damage, major plumbing/electrical faults) shall be the responsibility of the **Landlord**.

7.3. **Notification:** The Tenant shall promptly notify the Landlord of any need for major repairs. The Landlord shall undertake such repairs within a reasonable time.

7.4. **Damage by Tenant:** Any damage to the property or fixtures caused by negligence, misuse, or willful act of the Tenant, family members, guests, or invitees shall be repaired by the Tenant at their own cost, failing which the cost shall be deducted from the security deposit.

---

### 8. TERMINATION

8.1. **By Mutual Consent:** This Agreement may be terminated at any time by mutual written consent of both Parties.

8.2. **Early Termination by Tenant:** The Tenant may terminate this Agreement after the lock-in period by giving **1 (one) month's prior written notice** to the Landlord. In case of premature termination, the Tenant shall forfeit rent equivalent to **1 (one) month** as a penalty, which may be adjusted from the security deposit.

8.3. **Early Termination by Landlord:** The Landlord may terminate this Agreement after the lock-in period by giving **1 (one) month's prior written notice** to the Tenant, provided there is no breach by the Tenant.

8.4. **Termination for Breach:** Either Party may terminate this Agreement immediately by written notice if the other Party commits a material breach and fails to remedy such breach within **15 (fifteen) days** of receiving written notice specifying the breach. Material breaches include:
    a. By Tenant: Non-payment of rent for **30 consecutive days**, subletting, using property for illegal purposes, causing substantial damage.
    b. By Landlord: Failure to provide peaceful possession, failure to undertake major repairs affecting habitability.

8.5. **Expiry:** Upon expiry of the lease term, if the Tenant continues to occupy the property and the Landlord continues to accept rent, the tenancy shall be deemed to continue on a month-to-month basis on the same terms and conditions.

---

### 9. HANDING OVER AND TAKING POSSESSION

9.1. **Condition at Commencement:** The Tenant acknowledges that the property has been handed over in good and tenantable condition. [Optional: Attach an inventory/condition report signed by both Parties.]

9.2. **Condition at Vacating:** Upon termination, the Tenant shall hand over vacant possession of the property to the Landlord in the same good condition as received, fair wear and tear excepted.

9.3. **Final Inspection:** The Landlord and Tenant shall jointly inspect the property at the time of vacating. Any damages identified shall be documented, and repair costs shall be mutually agreed upon or assessed by a third-party expert.

---

### 10. POLICE INTIMATION AND LEGAL COMPLIANCE

10.1. The Tenant shall, within **7 (seven) days** of occupying the property, submit to the Landlord copies of:
    a. Aadhaar Card
    b. Passport-size photographs
    c. Any other identity/address proof as required by law

10.2. The Landlord shall provide such information to local police authorities as per the requirements of the ${formData.state || '[State]'} Police Act and Tenancy Laws.

10.3. The Tenant shall comply with all applicable laws, including but not limited to, building bye-laws, fire safety norms, and resident welfare association rules.

---

### 11. FORCE MAJEURE

11.1. Neither Party shall be liable for failure or delay in performance of obligations under this Agreement due to causes beyond their reasonable control, including but not limited to acts of God, war, riots, strikes, epidemics, pandemics, government orders, natural calamities, or any other force majeure event.

11.2. The affected Party shall notify the other Party promptly and make reasonable efforts to mitigate the impact.

---

### 12. INDEMNITY

12.1. The Tenant shall indemnify and hold harmless the Landlord from any loss, damage, liability, claims, demands, costs, or expenses arising out of the Tenant's use or occupation of the property, including any injury to persons or damage to property occurring within the demised premises.

---

### 13. NOTICE

13.1. All notices under this Agreement shall be in writing and shall be deemed duly given when:
    a. Delivered personally, OR
    b. Sent by registered post/speed post to the addresses mentioned at the beginning of this Agreement, OR
    c. Sent by email with read receipt/acknowledgment to the email addresses provided by the Parties.

13.2. Either Party may change their address/email for notice by providing written notice to the other Party.

---

### 14. DISPUTE RESOLUTION

14.1. Any dispute or difference arising out of or in connection with this Agreement shall first be attempted to be resolved amicably through good faith negotiations between the Parties.

14.2. If the dispute cannot be settled amicably within **15 (fifteen) days**, it shall be referred to arbitration in accordance with the Arbitration and Conciliation Act, 1996.

14.3. The arbitration shall be conducted by a sole arbitrator mutually appointed by the Parties. The seat of arbitration shall be **${formData.state || '[City/State]'}**, and the language shall be English/Hindi as mutually agreed.

14.4. The arbitrator's award shall be final and binding on both Parties.

---

### 15. GOVERNING LAW AND JURISDICTION

15.1. This Agreement shall be governed by and construed in accordance with the laws of India, particularly:
    a. The Indian Contract Act, 1872
    b. The Transfer of Property Act, 1882
    c. The ${formData.state || '[State]'} Rent Control Act (if applicable)
    d. The ${formData.state || '[State]'} Tenancy Laws

15.2. Subject to the arbitration clause, the Courts in **${formData.state || '[City]'}** shall have exclusive jurisdiction over any matters arising out of this Agreement.

---

### 16. GENERAL PROVISIONS

16.1. **Entire Agreement:** This Agreement constitutes the entire agreement between the Parties and supersedes all prior discussions, agreements, or understandings, whether oral or written.

16.2. **Amendments:** Any amendment or modification to this Agreement shall be valid only if made in writing and signed by both Parties.

16.3. **Severability:** If any provision of this Agreement is held to be invalid or unenforceable, the remaining provisions shall continue in full force and effect.

16.4. **Waiver:** No waiver of any breach of this Agreement shall constitute a waiver of any subsequent breach.

16.5. **Binding Effect:** This Agreement shall be binding upon and inure to the benefit of the Parties and their respective heirs, executors, administrators, successors, and permitted assigns.

---

**IN WITNESS WHEREOF,** the Parties have executed this Agreement on the day and year first above written.

---

**LANDLORD**

___________________________
${formData.landlordName || '[LANDLORD NAME]'}

Address: [Landlord's Address]
Contact: [Phone Number]
Email: [Email Address]

**WITNESSES:**

1. Signature: ___________________________
   Name: [Witness 1 Name]
   Address: [Witness 1 Address]

2. Signature: ___________________________
   Name: [Witness 2 Name]
   Address: [Witness 2 Address]

---

**TENANT**

___________________________
${formData.tenantName || '[TENANT NAME]'}

Address: [Tenant's Address]
Contact: [Phone Number]
Email: [Email Address]

**WITNESSES:**

1. Signature: ___________________________
   Name: [Witness 1 Name]
   Address: [Witness 1 Address]

2. Signature: ___________________________
   Name: [Witness 2 Name]
   Address: [Witness 2 Address]

---

**LEGAL NOTES:**

• **Stamp Duty:** This Agreement MUST be executed on non-judicial stamp paper of appropriate value as per the **${formData.state || '[State]'} Stamp Act**. The stamp duty value varies from state to state (typically 0.5% to 2% of annual rent). Consult the local Sub-Registrar's office or a legal professional for the exact amount.

• **Registration:** Under the Registration Act, 1908, lease agreements for a period exceeding **11 months** require mandatory registration with the Sub-Registrar. For 11-month agreements, registration is optional but highly recommended for legal enforceability and as proof of residence.

• **TDS on Rent:** If monthly rent exceeds INR 50,000/-, the Tenant is required to deduct TDS @ 10% under Section 194-IB of the Income Tax Act, 1961, and remit it to the government.

• **Legal Advice:** This template is for informational and educational purposes only. It is strongly advised to consult a qualified legal professional or advocate to customize this agreement as per specific requirements, local laws, and recent judicial precedents.

• **Placeholders:** Please fill in all bracketed placeholders […] with accurate information before execution.

---

*Generated by LexMind AI - Advocate Platform*
*This is a legally binding document. Review all terms carefully and seek independent legal advice before execution.*`;
};

export const generateNDA = (formData) => {
    const today = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });

    return `## NON-DISCLOSURE AGREEMENT (NDA)

This Non-Disclosure Agreement (the "Agreement") is entered into on **${today}**

**BETWEEN:**

**${formData.party1Name || '[PARTY 1 NAME]'}**, having its registered office/residence at [Address], (hereinafter referred to as the "Disclosing Party") of the **FIRST PART**;

**AND**

**${formData.party2Name || '[PARTY 2 NAME]'}**, having its registered office/residence at [Address], (hereinafter referred to as the "Receiving Party") of the **SECOND PART**.

(The Disclosing Party and Receiving Party are collectively referred to as "Parties")

**WHEREAS:**

A. The Parties wish to explore a business opportunity requiring disclosure of certain confidential and proprietary information.
B. The Disclosing Party possesses Confidential Information that it wishes to protect from unauthorized disclosure.
C. The Receiving Party acknowledges the confidential nature of such information and agrees to be bound by the terms hereof.

**NOW THEREFORE, in consideration of the mutual covenants and agreements herein, the Parties agree as follows:**

---

### 1. DEFINITIONS

1.1. **"Confidential Information"** means all information disclosed by the Disclosing Party, whether orally, in writing, or in any other form, that is designated as confidential or that reasonably should be understood to be confidential given the nature of the information and circumstances of disclosure.

---

### 2. OBLIGATIONS

2.1. The Receiving Party shall:
    a. Keep all Confidential Information strictly confidential
    b. Not disclose to any third party without prior written consent
    c. Use Confidential Information solely for the purpose of [specify purpose]
    d. Protect with the same degree of care as its own confidential information

---

### 3. TERM

3.1. This Agreement shall remain in effect for **${formData.duration || '2 (two) years'}** from the Effective Date.

---

**IN WITNESS WHEREOF,** the Parties have executed this Agreement.

**${formData.party1Name || '[PARTY 1]'}**          **${formData.party2Name || '[PARTY 2]'}**

___________________________          ___________________________

---

*Generated by LexMind AI - Advocate Platform*`;
};

export default {
    generateEmploymentAgreement,
    generateRentalAgreement,
    generateNDA
};
