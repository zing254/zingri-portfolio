"use client";

import { useCallback, useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  Node,
  Edge,
  NodeProps,
  useNodesState,
  useEdgesState,
  MarkerType,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import {
  Cpu,
  Cloud,
  Shield,
  Server,
  Database,
  ArrowRight,
  Network,
  Lock,
  Activity,
  Layers,
  Zap,
  GitBranch,
} from "lucide-react";

interface ArchitecturePattern {
  id: string;
  label: string;
  icon: React.ElementType;
  description: string;
  nodes: Node[];
  edges: Edge[];
}

const nodeTypes = {
  serviceNode: ({ data }: NodeProps) => {
    const d = data as { label: string; icon?: React.ElementType; tech?: string[] };
    return (
    <div className="px-4 py-3 rounded-xl glass border border-primary/30 bg-surface/90 shadow-lg shadow-primary/10 min-w-[140px] cursor-pointer hover:border-accent/50 transition-all group">
      <div className="flex items-center gap-2">
        {d.icon && <d.icon className="w-4 h-4 text-primary" />}
        <span className="text-xs font-bold font-mono text-white">{d.label}</span>
      </div>
      {d.tech && (
        <div className="mt-1.5 flex flex-wrap gap-1">
          {d.tech.slice(0, 3).map((t: string) => (
            <span key={t} className="text-[8px] px-1.5 py-0.5 rounded bg-white/5 text-muted font-mono">
              {t}
            </span>
          ))}
        </div>
      )}
      <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-accent opacity-0 group-hover:opacity-100 transition-opacity shadow-[0_0_6px_#39ff14]" />
    </div>
    );
  },
};

const microservices: ArchitecturePattern = {
  id: "microservices",
  label: "Microservices",
  icon: Layers,
  description: "Decoupled, independently deployable services communicating via APIs and message queues.",
  nodes: [
    { id: "gateway", type: "serviceNode", position: { x: 250, y: 0 }, data: { label: "API Gateway", icon: Network, tech: ["Kong", "Nginx"] } },
    { id: "auth", type: "serviceNode", position: { x: 0, y: 120 }, data: { label: "Auth Service", icon: Lock, tech: ["JWT", "OAuth2"] } },
    { id: "users", type: "serviceNode", position: { x: 180, y: 120 }, data: { label: "User Service", icon: Server, tech: ["Node.js"] } },
    { id: "payments", type: "serviceNode", position: { x: 360, y: 120 }, data: { label: "Payment Service", icon: Cpu, tech: ["Stripe"] } },
    { id: "notify", type: "serviceNode", position: { x: 540, y: 120 }, data: { label: "Notification", icon: Activity, tech: ["WebSocket"] } },
    { id: "queue", type: "serviceNode", position: { x: 250, y: 240 }, data: { label: "Message Queue", icon: GitBranch, tech: ["RabbitMQ"] } },
    { id: "db1", type: "serviceNode", position: { x: 80, y: 350 }, data: { label: "Users DB", icon: Database, tech: ["PostgreSQL"] } },
    { id: "db2", type: "serviceNode", position: { x: 250, y: 350 }, data: { label: "Payments DB", icon: Database, tech: ["MongoDB"] } },
    { id: "cache", type: "serviceNode", position: { x: 420, y: 350 }, data: { label: "Cache Layer", icon: Database, tech: ["Redis"] } },
  ],
  edges: [
    { id: "e-gw-auth", source: "gateway", target: "auth", animated: true, style: { stroke: "#a855f7", strokeWidth: 2 }, markerEnd: { type: MarkerType.ArrowClosed, color: "#a855f7" } },
    { id: "e-gw-users", source: "gateway", target: "users", animated: true, style: { stroke: "#00d4ff", strokeWidth: 2 }, markerEnd: { type: MarkerType.ArrowClosed, color: "#00d4ff" } },
    { id: "e-gw-pay", source: "gateway", target: "payments", animated: true, style: { stroke: "#00d4ff", strokeWidth: 2 }, markerEnd: { type: MarkerType.ArrowClosed, color: "#00d4ff" } },
    { id: "e-gw-notify", source: "gateway", target: "notify", animated: true, style: { stroke: "#00d4ff", strokeWidth: 2 }, markerEnd: { type: MarkerType.ArrowClosed, color: "#00d4ff" } },
    { id: "e-pay-queue", source: "payments", target: "queue", style: { stroke: "#39ff14", strokeWidth: 1.5, strokeDasharray: "5 5" }, markerEnd: { type: MarkerType.ArrowClosed, color: "#39ff14" } },
    { id: "e-queue-notify", source: "queue", target: "notify", style: { stroke: "#39ff14", strokeWidth: 1.5, strokeDasharray: "5 5" }, markerEnd: { type: MarkerType.ArrowClosed, color: "#39ff14" } },
    { id: "e-users-db", source: "users", target: "db1", style: { stroke: "#888", strokeWidth: 1.5 }, markerEnd: { type: MarkerType.ArrowClosed, color: "#888" } },
    { id: "e-pay-db", source: "payments", target: "db2", style: { stroke: "#888", strokeWidth: 1.5 }, markerEnd: { type: MarkerType.ArrowClosed, color: "#888" } },
    { id: "e-gw-cache", source: "gateway", target: "cache", style: { stroke: "#888", strokeWidth: 1.5, strokeDasharray: "3 3" }, markerEnd: { type: MarkerType.ArrowClosed, color: "#888" } },
  ],
};

const securityArch: ArchitecturePattern = {
  id: "security",
  label: "Security Architecture",
  icon: Shield,
  description: "Defense-in-depth architecture with layered security controls and monitoring.",
  nodes: [
    { id: "waf", type: "serviceNode", position: { x: 250, y: 0 }, data: { label: "WAF", icon: Shield, tech: ["Cloudflare"] } },
    { id: "lb", type: "serviceNode", position: { x: 250, y: 100 }, data: { label: "Load Balancer", icon: Network, tech: ["HAProxy"] } },
    { id: "ids", type: "serviceNode", position: { x: 80, y: 200 }, data: { label: "IDS/IPS", icon: Activity, tech: ["Snort"] } },
    { id: "app", type: "serviceNode", position: { x: 250, y: 200 }, data: { label: "App Servers", icon: Server, tech: ["Docker"] } },
    { id: "honeypot", type: "serviceNode", position: { x: 420, y: 200 }, data: { label: "Honeypot", icon: Cpu, tech: ["Decoy"] } },
    { id: "siem", type: "serviceNode", position: { x: 80, y: 320 }, data: { label: "SIEM", icon: Activity, tech: ["Splunk"] } },
    { id: "db", type: "serviceNode", position: { x: 250, y: 320 }, data: { label: "Encrypted DB", icon: Database, tech: ["AES-256"] } },
    { id: "vault", type: "serviceNode", position: { x: 420, y: 320 }, data: { label: "Secrets Vault", icon: Lock, tech: ["HashiCorp"] } },
    { id: "fw", type: "serviceNode", position: { x: 250, y: -100 }, data: { label: "Firewall", icon: Shield, tech: ["iptables"] } },
  ],
  edges: [
    { id: "s-fw-waf", source: "fw", target: "waf", animated: true, style: { stroke: "#39ff14", strokeWidth: 2 }, markerEnd: { type: MarkerType.ArrowClosed, color: "#39ff14" } },
    { id: "s-waf-lb", source: "waf", target: "lb", animated: true, style: { stroke: "#00d4ff", strokeWidth: 2 }, markerEnd: { type: MarkerType.ArrowClosed, color: "#00d4ff" } },
    { id: "s-lb-ids", source: "lb", target: "ids", style: { stroke: "#a855f7", strokeWidth: 1.5 }, markerEnd: { type: MarkerType.ArrowClosed, color: "#a855f7" } },
    { id: "s-lb-app", source: "lb", target: "app", style: { stroke: "#00d4ff", strokeWidth: 2 }, markerEnd: { type: MarkerType.ArrowClosed, color: "#00d4ff" } },
    { id: "s-lb-honey", source: "lb", target: "honeypot", style: { stroke: "#888", strokeWidth: 1.5, strokeDasharray: "5 5" }, markerEnd: { type: MarkerType.ArrowClosed, color: "#888" } },
    { id: "s-ids-siem", source: "ids", target: "siem", style: { stroke: "#a855f7", strokeWidth: 1.5 }, markerEnd: { type: MarkerType.ArrowClosed, color: "#a855f7" } },
    { id: "s-app-db", source: "app", target: "db", style: { stroke: "#888", strokeWidth: 1.5 }, markerEnd: { type: MarkerType.ArrowClosed, color: "#888" } },
    { id: "s-app-vault", source: "app", target: "vault", style: { stroke: "#a855f7", strokeWidth: 1, strokeDasharray: "3 3" }, markerEnd: { type: MarkerType.ArrowClosed, color: "#a855f7" } },
    { id: "s-siem-fw", source: "siem", target: "fw", style: { stroke: "#39ff14", strokeWidth: 1, strokeDasharray: "4 4" }, markerEnd: { type: MarkerType.ArrowClosed, color: "#39ff14" } },
  ],
};

const eventDriven: ArchitecturePattern = {
  id: "event-driven",
  label: "Event-Driven",
  icon: Zap,
  description: "Asynchronous communication via event bus, enabling decoupled and scalable processing.",
  nodes: [
    { id: "producer1", type: "serviceNode", position: { x: 0, y: 50 }, data: { label: "Web App", icon: Server, tech: ["React"] } },
    { id: "producer2", type: "serviceNode", position: { x: 0, y: 180 }, data: { label: "Mobile App", icon: Cpu, tech: ["React Native"] } },
    { id: "producer3", type: "serviceNode", position: { x: 0, y: 310 }, data: { label: "IoT Device", icon: Activity, tech: ["MQTT"] } },
    { id: "eventbus", type: "serviceNode", position: { x: 250, y: 180 }, data: { label: "Event Bus", icon: GitBranch, tech: ["Kafka"] } },
    { id: "consumer1", type: "serviceNode", position: { x: 500, y: 50 }, data: { label: "Analytics", icon: Activity, tech: ["Spark"] } },
    { id: "consumer2", type: "serviceNode", position: { x: 500, y: 180 }, data: { label: "Email Service", icon: Server, tech: ["Node.js"] } },
    { id: "consumer3", type: "serviceNode", position: { x: 500, y: 310 }, data: { label: "Audit Logger", icon: Database, tech: ["Elasticsearch"] } },
    { id: "dlq", type: "serviceNode", position: { x: 250, y: 350 }, data: { label: "Dead Letter Q", icon: Shield, tech: ["SQS"] } },
  ],
  edges: [
    { id: "ed-p1-bus", source: "producer1", target: "eventbus", animated: true, style: { stroke: "#00d4ff", strokeWidth: 2 }, markerEnd: { type: MarkerType.ArrowClosed, color: "#00d4ff" } },
    { id: "ed-p2-bus", source: "producer2", target: "eventbus", animated: true, style: { stroke: "#a855f7", strokeWidth: 2 }, markerEnd: { type: MarkerType.ArrowClosed, color: "#a855f7" } },
    { id: "ed-p3-bus", source: "producer3", target: "eventbus", animated: true, style: { stroke: "#39ff14", strokeWidth: 2 }, markerEnd: { type: MarkerType.ArrowClosed, color: "#39ff14" } },
    { id: "ed-bus-c1", source: "eventbus", target: "consumer1", style: { stroke: "#00d4ff", strokeWidth: 2 }, markerEnd: { type: MarkerType.ArrowClosed, color: "#00d4ff" } },
    { id: "ed-bus-c2", source: "eventbus", target: "consumer2", style: { stroke: "#a855f7", strokeWidth: 2 }, markerEnd: { type: MarkerType.ArrowClosed, color: "#a855f7" } },
    { id: "ed-bus-c3", source: "eventbus", target: "consumer3", style: { stroke: "#39ff14", strokeWidth: 2 }, markerEnd: { type: MarkerType.ArrowClosed, color: "#39ff14" } },
    { id: "ed-bus-dlq", source: "eventbus", target: "dlq", style: { stroke: "#ff6b35", strokeWidth: 1.5, strokeDasharray: "5 5" }, markerEnd: { type: MarkerType.ArrowClosed, color: "#ff6b35" } },
  ],
};

const serverless: ArchitecturePattern = {
  id: "serverless",
  label: "Serverless",
  icon: Cloud,
  description: "Cloud-native architecture with auto-scaling functions and managed services.",
  nodes: [
    { id: "cdn", type: "serviceNode", position: { x: 0, y: 0 }, data: { label: "CDN", icon: Cloud, tech: ["Cloudflare"] } },
    { id: "apigw", type: "serviceNode", position: { x: 250, y: 0 }, data: { label: "API Gateway", icon: Network, tech: ["AWS API GW"] } },
    { id: "auth", type: "serviceNode", position: { x: 250, y: 100 }, data: { label: "Cognito Auth", icon: Lock, tech: ["JWT"] } },
    { id: "fn1", type: "serviceNode", position: { x: 80, y: 200 }, data: { label: "Users Lambda", icon: Cpu, tech: ["Node.js"] } },
    { id: "fn2", type: "serviceNode", position: { x: 250, y: 200 }, data: { label: "Orders Lambda", icon: Cpu, tech: ["Python"] } },
    { id: "fn3", type: "serviceNode", position: { x: 420, y: 200 }, data: { label: "Process Lambda", icon: Cpu, tech: ["Go"] } },
    { id: "dynamo", type: "serviceNode", position: { x: 80, y: 320 }, data: { label: "DynamoDB", icon: Database, tech: ["NoSQL"] } },
    { id: "s3", type: "serviceNode", position: { x: 250, y: 320 }, data: { label: "S3 Storage", icon: Database, tech: ["Objects"] } },
    { id: "sqs", type: "serviceNode", position: { x: 420, y: 320 }, data: { label: "SQS Queue", icon: GitBranch, tech: ["Async"] } },
  ],
  edges: [
    { id: "sl-cdn-gw", source: "cdn", target: "apigw", animated: true, style: { stroke: "#00d4ff", strokeWidth: 2 }, markerEnd: { type: MarkerType.ArrowClosed, color: "#00d4ff" } },
    { id: "sl-gw-auth", source: "apigw", target: "auth", style: { stroke: "#a855f7", strokeWidth: 1.5 }, markerEnd: { type: MarkerType.ArrowClosed, color: "#a855f7" } },
    { id: "sl-gw-fn1", source: "apigw", target: "fn1", style: { stroke: "#00d4ff", strokeWidth: 2 }, markerEnd: { type: MarkerType.ArrowClosed, color: "#00d4ff" } },
    { id: "sl-gw-fn2", source: "apigw", target: "fn2", style: { stroke: "#00d4ff", strokeWidth: 2 }, markerEnd: { type: MarkerType.ArrowClosed, color: "#00d4ff" } },
    { id: "sl-gw-fn3", source: "apigw", target: "fn3", style: { stroke: "#00d4ff", strokeWidth: 2 }, markerEnd: { type: MarkerType.ArrowClosed, color: "#00d4ff" } },
    { id: "sl-fn1-db", source: "fn1", target: "dynamo", style: { stroke: "#888", strokeWidth: 1.5 }, markerEnd: { type: MarkerType.ArrowClosed, color: "#888" } },
    { id: "sl-fn2-s3", source: "fn2", target: "s3", style: { stroke: "#888", strokeWidth: 1.5 }, markerEnd: { type: MarkerType.ArrowClosed, color: "#888" } },
    { id: "sl-fn3-sqs", source: "fn3", target: "sqs", style: { stroke: "#888", strokeWidth: 1.5, strokeDasharray: "4 4" }, markerEnd: { type: MarkerType.ArrowClosed, color: "#888" } },
    { id: "sl-auth-fn1", source: "auth", target: "fn1", style: { stroke: "#a855f7", strokeWidth: 1, strokeDasharray: "3 3" }, markerEnd: { type: MarkerType.ArrowClosed, color: "#a855f7" } },
  ],
};

const patterns = [microservices, securityArch, eventDriven, serverless];

export default function Architecture() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activePattern, setActivePattern] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const pattern = patterns[activePattern];

  return (
    <section id="architecture" ref={ref} className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 grid-bg" />
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full blur-[180px] bg-secondary/5" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/30 mb-6">
            <span className="text-xs font-mono text-primary/80">cat architecture.sh</span>
          </div>
          <h2 className="font-heading text-5xl md:text-6xl font-bold mb-4">
            <span className="text-white">System </span>
            <span className="glow-text-primary text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              Architecture
            </span>
          </h2>
          <p className="text-muted max-w-2xl mx-auto">
            Architectural patterns I design and implement for scalable, secure systems.
          </p>
          <div className="w-24 h-1 mx-auto mt-6 rounded-full bg-gradient-to-r from-primary via-secondary to-accent"
               style={{ boxShadow: "0 0 20px var(--primary)" }} />
        </motion.div>

        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {patterns.map((p, i) => (
            <button
              key={p.id}
              onClick={() => setActivePattern(i)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono transition-all ${
                activePattern === i
                  ? "bg-primary/20 text-primary border border-primary/40 shadow-[0_0_15px_rgba(0,212,255,0.2)]"
                  : "glass border border-white/10 text-muted hover:text-white hover:border-primary/30"
              }`}
            >
              <p.icon className="w-3.5 h-3.5" />
              <span>{p.label}</span>
            </button>
          ))}
        </div>

        <motion.p
          key={pattern.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xs text-muted font-mono text-center mb-6"
        >
          {pattern.description}
        </motion.p>

        <motion.div
          key={pattern.id}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="glass rounded-2xl border border-primary/20 overflow-hidden"
          style={{ height: 480 }}
        >
          {mounted && (
            <ReactFlow
              nodes={pattern.nodes}
              edges={pattern.edges}
              nodeTypes={nodeTypes}
              fitView
              fitViewOptions={{ padding: 0.3 }}
              minZoom={0.3}
              maxZoom={2}
              panOnDrag
              zoomOnScroll
              nodesDraggable={false}
              nodesConnectable={false}
              elementsSelectable={false}
              className="bg-[#030303]"
            >
              <Background color="rgba(0,212,255,0.05)" gap={24} />
              <Controls
                className="glass rounded-lg border border-white/10 [&_button]:text-white [&_button]:hover:bg-white/10"
              />
              <MiniMap
                nodeColor="rgba(0,212,255,0.3)"
                maskColor="rgba(0,0,0,0.7)"
                className="glass rounded-lg border border-white/10"
              />
            </ReactFlow>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { label: "Patterns", value: "4+" },
            { label: "Services per Pattern", value: "8-12" },
            { label: "Years Experience", value: "7+" },
            { label: "Systems Architected", value: "15+" },
          ].map((stat, i) => (
            <div key={i} className="p-4 rounded-xl glass border border-white/5 text-center">
              <p className="font-heading text-2xl font-bold text-primary">{stat.value}</p>
              <p className="text-xs text-muted font-mono">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
    </section>
  );
}
