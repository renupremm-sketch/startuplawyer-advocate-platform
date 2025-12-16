-- ----------------------------------------------------------------------
-- ADVOCATE PLATFORM V1.0 - DATABASE BLUEPRINT
-- "Courtroom-Grade" Relational Schema
-- PostGreSQL Compatible
-- ----------------------------------------------------------------------

-- 1. USERS & ROLES (Strict Access Control)
CREATE TYPE user_role AS ENUM ('Senior Advocate', 'Junior Advocate', 'Clerk', 'Intern', 'Admin');

CREATE TABLE users (
    user_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name VARCHAR(255) NOT NULL,
    bar_council_id VARCHAR(50), -- Nullable for clerks/interns
    role user_role NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    two_factor_enabled BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_login TIMESTAMP WITH TIME ZONE
);

-- 2. CHAMBERS & CLIENTS
CREATE TABLE chambers (
    chamber_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    chamber_name VARCHAR(255) NOT NULL,
    head_advocate_id UUID REFERENCES users(user_id)
);

CREATE TABLE clients (
    client_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    chamber_id UUID REFERENCES chambers(chamber_id),
    full_name VARCHAR(255) NOT NULL,
    client_type VARCHAR(50) CHECK (client_type IN ('Individual', 'Corporate', 'Pro Bono')),
    retainer_status VARCHAR(50),
    confidential_notes TEXT, -- Encrypted at rest
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. CASE MANAGEMENT & DIARY (The "Core")
CREATE TABLE cases (
    case_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    chamber_id UUID REFERENCES chambers(chamber_id),
    client_id UUID REFERENCES clients(client_id),
    court_name VARCHAR(255) NOT NULL,
    case_number_original VARCHAR(100) NOT NULL,
    case_number_new VARCHAR(100),
    judge_name VARCHAR(255),
    current_stage VARCHAR(100),
    filing_date DATE,
    status VARCHAR(50) DEFAULT 'Active'
);

CREATE TABLE case_proceedings (
    proceeding_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    case_id UUID REFERENCES cases(case_id),
    hearing_date DATE NOT NULL,
    order_summary TEXT, -- "Matter reached... arguments heard..."
    next_date DATE,
    attendee_advocate_id UUID REFERENCES users(user_id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. DRAFTING & AGREEMENTS (Version Control)
CREATE TABLE drafts (
    draft_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    case_id UUID REFERENCES cases(case_id),
    author_id UUID REFERENCES users(user_id),
    title VARCHAR(255) NOT NULL,
    content TEXT, -- Current version content
    version_number INT DEFAULT 1,
    status VARCHAR(50) CHECK (status IN ('Draft', 'Review', 'Finalized', 'Filed')),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE draft_versions (
    version_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    draft_id UUID REFERENCES drafts(draft_id),
    content_snapshot TEXT NOT NULL,
    modified_by UUID REFERENCES users(user_id),
    modification_note TEXT,
    saved_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. DOCUMENT & EVIDENCE (Encrypted)
CREATE TABLE documents (
    doc_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    parent_id UUID, -- Can link to case_id OR draft_id
    parent_type VARCHAR(50), -- 'CASE', 'DRAFT', 'CLIENT'
    file_name VARCHAR(255) NOT NULL,
    s3_path_encrypted VARCHAR(512) NOT NULL,
    file_type VARCHAR(50),
    tags TEXT[],
    is_privileged BOOLEAN DEFAULT FALSE, -- Higher security tier
    uploaded_by UUID REFERENCES users(user_id),
    uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. AI CONFIGURATION & CONTROL (The "Brain")
CREATE TABLE ai_system_configs (
    config_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    chamber_id UUID REFERENCES chambers(chamber_id),
    model_name VARCHAR(50) DEFAULT 'gpt-4-legal-v1',
    temperature FLOAT DEFAULT 0.2, -- Low creativity for legal accuracy
    max_tokens INT DEFAULT 4000,
    system_prompt_master TEXT NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_by UUID REFERENCES users(user_id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE ai_source_restrictions (
    restriction_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    config_id UUID REFERENCES ai_system_configs(config_id),
    source_type VARCHAR(50) NOT NULL, -- 'BARE_ACTS', 'UPLOADED_DOCS', 'JUDGMENTS'
    is_allowed BOOLEAN DEFAULT TRUE
);

CREATE TABLE ai_audit_logs (
    log_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(user_id),
    config_version_id UUID REFERENCES ai_system_configs(config_id),
    prompt_hash VARCHAR(255),
    sources_cited TEXT[],
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    disclaimer_shown BOOLEAN DEFAULT TRUE
);
