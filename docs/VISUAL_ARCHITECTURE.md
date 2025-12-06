# VibeKit Visual Architecture

## 🏗️ Recommended Architecture: Single Universal Extension

### High-Level Overview

```mermaid
graph TB
    subgraph "VibeKit Monorepo"
        VSCode[VSCode Extension<br/>Universal]
        Zed[Zed Extension<br/>Native]
    end

    subgraph "Supported Editors"
        Cursor[Cursor Editor]
        Windsurf[Windsurf Editor]
        Antigravity[Antigravity Editor]
        GenericVSC[Generic VSCode]
        ZedEditor[Zed Editor]
    end

    VSCode --> Cursor
    VSCode --> Windsurf
    VSCode --> Antigravity
    VSCode --> GenericVSC
    Zed --> ZedEditor
```

### VSCode Extension Internal Architecture

```mermaid
graph TB
    subgraph "VSCode Extension"
        Entry[extension.ts<br/>Entry Point]

        subgraph "Provider Layer"
            Factory[Provider Factory<br/>Auto-detect]
            CursorP[Cursor Provider]
            WindsurfP[Windsurf Provider]
            AntigravityP[Antigravity Provider]
            GenericP[Generic Provider]
        end

        subgraph "Core Services"
            Git[Git Service<br/>Clone/Pull]
            Sync[Sync Service<br/>Rules & Agents]
            Config[Config Service<br/>Settings]
            Watch[Watcher Service<br/>Auto-sync]
        end

        subgraph "UI Layer"
            Commands[Commands]
            StatusBar[Status Bar]
            Notifications[Notifications]
        end
    end

    Entry --> Factory
    Factory --> CursorP
    Factory --> WindsurfP
    Factory --> AntigravityP
    Factory --> GenericP

    CursorP --> Sync
    WindsurfP --> Sync
    AntigravityP --> Sync
    GenericP --> Sync

    Sync --> Git
    Sync --> Config
    Sync --> Watch

    Commands --> Sync
    StatusBar --> Sync
    Notifications --> Sync
```

### Provider Pattern Flow

```mermaid
sequenceDiagram
    participant User
    participant Extension
    participant Factory
    participant Provider
    participant Sync
    participant Git
    participant FileSystem

    User->>Extension: Activate Extension
    Extension->>Factory: Detect Editor
    Factory->>Factory: Check vscode.env.appName
    Factory-->>Extension: Return Provider (e.g., Cursor)

    User->>Extension: Sync Rules
    Extension->>Provider: Get Rules Path
    Provider-->>Extension: .cursorrules
    Extension->>Sync: Sync from Git
    Sync->>Git: Pull Latest
    Git-->>Sync: Rules Content
    Sync->>Provider: Transform & Write
    Provider->>FileSystem: Write to .cursorrules
    Provider-->>User: ✓ Synced Successfully
```

### File Structure Comparison

#### ✅ Recommended: Single Extension

```
vscode/
├── src/
│   ├── providers/           # 750 lines total
│   │   ├── base.ts         # Interface (50 lines)
│   │   ├── cursor.ts       # 200 lines
│   │   ├── windsurf.ts     # 200 lines
│   │   ├── antigravity.ts  # 200 lines
│   │   ├── generic.ts      # 100 lines
│   │   └── factory.ts      # Auto-detection
│   ├── core/               # 1000 lines (SHARED)
│   │   ├── git.ts
│   │   ├── sync.ts
│   │   ├── config.ts
│   │   └── watcher.ts
│   ├── ui/                 # 300 lines (SHARED)
│   ├── commands/           # 200 lines (SHARED)
│   └── extension.ts        # 100 lines
└── package.json

Total: ~2,350 lines
```

#### ❌ Alternative: Multiple Extensions

```
extensions/
├── cursor/
│   ├── src/
│   │   ├── core/          # 1000 lines (DUPLICATED)
│   │   ├── ui/            # 300 lines (DUPLICATED)
│   │   ├── commands/      # 200 lines (DUPLICATED)
│   │   ├── cursor.ts      # 200 lines
│   │   └── extension.ts   # 100 lines
│   └── package.json
├── windsurf/
│   ├── src/
│   │   ├── core/          # 1000 lines (DUPLICATED)
│   │   ├── ui/            # 300 lines (DUPLICATED)
│   │   ├── commands/      # 200 lines (DUPLICATED)
│   │   ├── windsurf.ts    # 200 lines
│   │   └── extension.ts   # 100 lines
│   └── package.json
└── antigravity/
    ├── src/
    │   ├── core/          # 1000 lines (DUPLICATED)
    │   ├── ui/            # 300 lines (DUPLICATED)
    │   ├── commands/      # 200 lines (DUPLICATED)
    │   ├── antigravity.ts # 200 lines
    │   └── extension.ts   # 100 lines
    └── package.json

Total: ~5,400 lines (130% duplication!)
```

### Provider Detection Logic

```mermaid
graph TD
    Start[Extension Activates] --> Check{Check Editor}
    Check -->|Contains 'Cursor'| Cursor[Use Cursor Provider]
    Check -->|Contains 'Windsurf'| Windsurf[Use Windsurf Provider]
    Check -->|Contains 'Antigravity'| Antigravity[Use Antigravity Provider]
    Check -->|Other VSCode| Generic[Use Generic Provider]

    Cursor --> Init[Initialize Sync Service]
    Windsurf --> Init
    Antigravity --> Init
    Generic --> Init

    Init --> Ready[Extension Ready]
```

### Sync Workflow

```mermaid
graph LR
    subgraph "Git Repository"
        Repo[Rules Repo<br/>github.com/user/rules]
    end

    subgraph "VibeKit Extension"
        Git[Git Service]
        Sync[Sync Service]
        Provider[Provider]
    end

    subgraph "Editor-Specific Locations"
        Cursor[.cursorrules]
        Windsurf[.windsurfrules]
        Antigravity[.agent/]
    end

    Repo -->|Pull| Git
    Git -->|Rules Content| Sync
    Sync -->|Transform| Provider
    Provider -->|Write| Cursor
    Provider -->|Write| Windsurf
    Provider -->|Write| Antigravity
```

## 🎯 Decision Summary

### ✅ Single Universal Extension

**Pros:**

- ✅ 80% less code duplication
- ✅ 2.2x faster development
- ✅ 3x easier maintenance
- ✅ Consistent UX
- ✅ Easy to add new providers
- ✅ Better tested (shared logic)

**Cons:**

- ⚠️ Slightly more complex (provider pattern)
- ⚠️ Larger package size (~500KB vs ~400KB)

---

**Recommendation: Implement Single Universal Extension với Provider Pattern** ✅
