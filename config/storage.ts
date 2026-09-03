import { Storage } from "@google-cloud/storage";

const storage = new Storage({
  projectId: "utility-emblem-457614-s6",
  credentials: {
    type: "service_account",
    project_id: "utility-emblem-457614-s6",
    private_key_id: "79bf7df1b5185e0c45f06aeee6c8409530de5678",
    private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC+TRv27ZbNqcG+\n5nYoaNVTQXOfVovNV6ES4d3wHqJneHiaZWB45bpTAgrS5Wbd0ry/LMrdQFR+JgvE\nd77tfy9QdKCGqVXAtNQkByiGlezHb0OqTs0q1e95/OcknsV/eVbF+LgYn0uMI1OQ\ntW51yezvJpUA1vzc3fZD2WBjvAzF0RL/xtOO/rTILrHnVn/wi/svqzmnkwucJV+Y\n18YdHaN2UMQx5xLPUBThdNKOSO8MjOinscR1YxtVDFo/GZAUK5e+Cn1Ve2BJRbrp\nZVaMVVQRXcdYiR8AFHR21Rkv02y5i/pqXj4V+9ti5/Fuy0xuoZBwvByqkwwBefJm\ngoNZDPZlAgMBAAECggEAFJa+IEybRLwJkLBZd0zES8IoksQn0vsYm7ThMLH3yy8P\nCVFPizT7oDB34FJee0BqGFrtxdtIaO+P1V1JRGO+yDseBQO8GeHWk+FMYqdE21zv\n2rS04N4Nj0qr7VvaLU0A9OFQdaWCZHKL/3uJrGfA4Szw8QrRh8nh83xIv/GgBiTF\nVqmbCdGcxGDDjalIlEJ4ACOiPN/MR57yQMjx22LRGxfUQV+8+Km+1HPCSaE06TpY\nkWE4KtKHGt/fl9vl4/1DdugybrpjYTsoUv8xRKxm9nTSJsPznJXWsfBaxpQv3Jot\n8c0mbUBomGCrkgf3rL768Axf7EtXc5S5b6qTDxDNLwKBgQDmHrBC/ibRRAADo8nf\nA0UaYQIGjZ0fOsIl6P3Hu6gkc55GY+PGqWp0799onPLKDANiT8EpjAxC9Ii8/pNI\n6NQko3xFfJFJ0YrhrGeZJ6IilpnTnSBab9n3Bdvebca3JEDFLdxXlF3x6sBQ9Rk0\not9GgBvLFCI/NL1DgibTYIz9hwKBgQDTtAN1Rf4xUnuxxMqzroHYf9JTxpyc6sHz\nT4RnCT/BMZA7zFDyMmY/cmbdxTwhMgcDi9kUzJxnSGECVjAIdahOwhyDKhDqFz0l\n9H4QcFsJ8zfl9HyqefjE+P76/+Xz/2dizRXG3ThkKSFUFraie/ZKewELSSrIwkKm\nGr/aAm8HswKBgQCZXAJj4zTDaeoIgvNaKLe46MWM0HvSADq7QRdAMRPRlyv4BUIb\nd3R3EhV1hoNXm8H1lulIYwkY5hbqvU4y3Nfkwv9i362D4J4J3/f63ar0GiHSIXka\nTEiak9D/33D7RLHVtsaNp1ckjio0yeNObO0X8vCS2owoS2GGyApP/Jx5qQKBgHI/\nq74WT9/+S5LcSSg+/QQBt1hOzyY/6vuL5kBU1XtFbDlZQjXyzQtgifMVBiZEAVUA\nm96FrcJvZSsFqFZoaLRYPVrr0MUEVZOuJnpoqDjucTRAhSbbPE3Qsopyn37WTs0b\nMK1ppY0oRTxEJbv6eignyaB1lAlUDPPna7ITrifRAoGAAcWQdq+aAC00zdWphSMY\nvYiD+w2WyAprMAmHF6EtGdh/kVHbS4Ap0k3QK3+5kCF69dybK5S0Mr8vtREnj4ei\n61tnnhrzlEPSv8shM499MThBxd7hjr7olekol0wMHjah/GKsqGpc/lPEHa8CGN3e\nNLcxZCt9PsOae9VLB4L/4JM=\n-----END PRIVATE KEY-----\n",
    client_email: "key-490@utility-emblem-457614-s6.iam.gserviceaccount.com",
    client_id: "117556956742803921859",
  }
});

export default storage;
