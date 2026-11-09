# IT315 Syllabus Alignment

## Source classification

The course facts and rubric in this document are **official syllabus information** supplied for this project. The CampusLink stack and API are **instructor-selected project decisions**, not additional syllabus outcomes.

## Course information

- **Title:** IT Elective 1 (Distributed Database Management Systems)
- **Code:** IT315; **Credits:** 3.0 units; **Lecture:** 2 hours; **Laboratory:** 3 hours
- **Semester:** First Semester, S.Y. 2026–2027

## Description and outcomes

The course covers distributed DBMS principles and architecture; partitioning, fragmentation, replication, consistency, distributed data models, query processing and optimization, transactions, fault tolerance and recovery, heterogeneous integration, federation, batch exchange, change data capture, and preparation of distributed data for integrated applications, analytics, machine learning, and decision-support systems.

**CO1:** Analyze distributed database architectures and evaluate trade-offs in scalability, consistency, availability, performance, and fault tolerance.  
**CampusLink evidence:** architecture comparison, CAP/PACELC discussion, managed-service capability analysis, and measured query/reliability results.

**CO2:** Design appropriate data partitioning, fragmentation, replication, and distributed data models based on application requirements and access patterns.  
**CampusLink evidence:** PostgreSQL/MongoDB ownership design, access-pattern indexes, campus-aware distribution discussion, and schema justification.

**CO3:** Implement and evaluate distributed data operations involving queries, indexing, optimization, transactions, concurrency, replication, and recovery using appropriate distributed database technologies.  
**CampusLink evidence:** parameterized queries, indexes and query plans, concurrent reservation tests, transactions, retries, backup/restoration, and integrity checks.

**CO4:** Design and implement mechanisms for accessing, integrating, and preparing heterogeneous distributed data through federation, batch data exchange, and change-oriented data pipelines for downstream integrated applications, analytics, and machine-learning workloads.  
**CampusLink evidence:** transactional outbox, MongoDB Change Streams, retryable synchronization, analytics exports, and consolidated JSON/CSV data.

## Relevant weekly topics

- **Weeks 1–2:** Foundations, architectures, distribution transparency, scalability, availability, reliability, fault tolerance, SQL/NoSQL, CAP, and PACELC.
- **Weeks 3–4:** Fragmentation, partitioning, sharding, placement, shard keys, replication, consistency, MongoDB distribution, and managed cloud scaling.
- **Weeks 5–6:** NoSQL models, ACID/BASE, denormalization, access-pattern modeling, Atlas, Firestore, and polyglot persistence.
- **Weeks 7–8:** Distributed query processing, data localization, indexing, query planning, aggregation, partition-aware queries, and optimization.
- **Weeks 10–12:** Transactions, concurrency control, isolation and consistency, distributed transactions and retry mechanisms, failure handling, replication and failover, backup, recovery, and data-integrity verification.
- **Weeks 13–16:** Heterogeneous databases, federation, polyglot persistence, JSON/CSV/XML, ETL/ELT, batch data exchange, synchronization, change data capture, MongoDB Change Streams, Firestore real-time updates, data consolidation, analytics-ready datasets, authentication, authorization, security, and data access.
- **Week 17:** Integration project architecture, distribution, queries, reliability, security, integration, analytics preparation, and evaluation.

## Official activities and development requirements

Activities include MongoDB and Firestore laboratories, distribution design, query/filter/index/aggregation work, concurrent operations and transactions, failure/recovery, MongoDB/Firestore comparison, relational/NoSQL integration, Change Streams or Firestore listeners, analytics-ready data, and security configuration. Required tools are a laptop or PC, Visual Studio Code, Git, GitHub, MongoDB documentation, and Firestore documentation.

## Official PIT rubric

1. Architecture and Project Design — **15%**
2. Data Modeling and Implementation — **25%**
3. Querying and Performance — **15%**
4. Integration, Reliability, and Security — **20%**
5. Testing and Data Evaluation — **10%**
6. Documentation and Presentation — **15%**

**TOTAL: 100%.** The PIT/project is 20% of the Lecture Grade; the portfolio forms part of the PIT; and requirements, deadlines, and rubrics must be communicated to students.

## Syllabus facts versus project decisions

The outcomes, topics, activities, tools, and rubric above are official. React/Vite, Node.js 26, Express 5, Supabase PostgreSQL, MongoDB Atlas, the endpoint list, ports, outbox design, and role/module scope are instructor-selected CampusLink decisions documented in the architecture and requirements files. They must not be presented as additional official syllabus requirements.

Specific group size, deadlines, institutional policies, approvals, and any extra grading weights are **Requires instructor confirmation**.

## Related documents

[Project overview](00-PROJECT-OVERVIEW.md), [architecture](03-SYSTEM-ARCHITECTURE.md), and [testing](08-TESTING-AND-ACCEPTANCE-CRITERIA.md).
