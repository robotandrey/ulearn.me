using System;
using System.Runtime.InteropServices;
using System.Threading;
using System.Windows.Forms;
using WindowsInput;

namespace autoclicker
{
    public partial class Form1 : Form
    {
        private bool isClicking = false;
        private Thread clickThread;
        private InputSimulator sim = new InputSimulator();
        private Keys toggleKey = Keys.F6;

        private static IntPtr _hookID = IntPtr.Zero;
        private static LowLevelKeyboardProc _proc = HookCallback;

        private TrackBar delaySlider;
        private Label delayLabel;
        private Label statusLabel;
        private Label hotkeyLabel;
        private Button changeHotkeyButton;

        private TabControl tabControl;

        public Form1()
        {
            InitializeComponent();

            this.Text = "Автокликер";
            this.Width = 400;
            this.Height = 250;
            this.FormBorderStyle = FormBorderStyle.FixedSingle;
            this.MaximizeBox = false;

            // Tabs
            tabControl = new TabControl()
            {
                Dock = DockStyle.Fill
            };
            var tabStatus = new TabPage("Статус");
            var tabSettings = new TabPage("Настройки");

            // ==== Вкладка 1: Статус ====
            statusLabel = new Label()
            {
                Text = $"Чтобы начать, нажми {toggleKey}",
                Dock = DockStyle.Fill,
                Font = new System.Drawing.Font("Segoe UI", 12),
                TextAlign = System.Drawing.ContentAlignment.MiddleCenter
            };
            tabStatus.Controls.Add(statusLabel);

            // ==== Вкладка 2: Настройки ====
            delaySlider = new TrackBar()
            {
                Minimum = 10,
                Maximum = 1000,
                Value = 100,
                TickFrequency = 100,
                Left = 20,
                Top = 20,
                Width = 320
            };
            delayLabel = new Label()
            {
                Text = $"Задержка: {delaySlider.Value} мс",
                Left = 20,
                Top = 60,
                Width = 300
            };
            delaySlider.Scroll += (s, e) =>
            {
                delayLabel.Text = $"Задержка: {delaySlider.Value} мс";
            };

            hotkeyLabel = new Label()
            {
                Text = $"Текущий хоткей: {toggleKey}",
                Left = 20,
                Top = 100,
                Width = 300
            };

            changeHotkeyButton = new Button()
            {
                Text = "Изменить хоткей",
                Left = 20,
                Top = 130,
                Width = 150
            };
            changeHotkeyButton.Click += (s, e) =>
            {
                changeHotkeyButton.Text = "Нажми клавишу...";
                changeHotkeyButton.Enabled = false;
                this.KeyPreview = true;
                this.KeyDown += Form1_KeyDown_SetHotkey;
            };

            tabSettings.Controls.Add(delaySlider);
            tabSettings.Controls.Add(delayLabel);
            tabSettings.Controls.Add(hotkeyLabel);
            tabSettings.Controls.Add(changeHotkeyButton);

            tabControl.TabPages.Add(tabStatus);
            tabControl.TabPages.Add(tabSettings);

            this.Controls.Add(tabControl);

            _hookID = SetHook(_proc);
        }

        private void Form1_KeyDown_SetHotkey(object sender, KeyEventArgs e)
        {
            toggleKey = e.KeyCode;
            hotkeyLabel.Text = $"Текущий хоткей: {toggleKey}";
            changeHotkeyButton.Text = "Изменить хоткей";
            changeHotkeyButton.Enabled = true;

            this.KeyDown -= Form1_KeyDown_SetHotkey;
            this.KeyPreview = false;
        }

        private void StartClicking()
        {
            isClicking = true;
            UpdateStatusSafe($"Кликер работает. Чтобы остановить, нажми {toggleKey}", true);

            clickThread = new Thread(() =>
            {
                while (isClicking)
                {
                    sim.Mouse.LeftButtonClick();
                    Thread.Sleep(delaySlider.InvokeRequired ? 100 : delaySlider.Value);
                }
            });
            clickThread.IsBackground = true;
            clickThread.Start();
        }

        private void StopClicking()
        {
            isClicking = false;
            UpdateStatusSafe($"Чтобы начать, нажми {toggleKey}", false);
        }

        private void UpdateStatusSafe(string text, bool isRunning)
        {
            if (statusLabel.InvokeRequired)
            {
                statusLabel.Invoke(new Action(() =>
                {
                    statusLabel.Text = text;
                    statusLabel.ForeColor = isRunning ? Color.Green : Color.Black;
                }));
            }
            else
            {
                statusLabel.Text = text;
                statusLabel.ForeColor = isRunning ? Color.Green : Color.Black;
            }
        }

        // HOOK
        private delegate IntPtr LowLevelKeyboardProc(int nCode, IntPtr wParam, IntPtr lParam);

        private static IntPtr SetHook(LowLevelKeyboardProc proc)
        {
            using (var curProcess = System.Diagnostics.Process.GetCurrentProcess())
            using (var curModule = curProcess.MainModule)
            {
                return SetWindowsHookEx(13, proc, GetModuleHandle(curModule.ModuleName), 0);
            }
        }

        private static IntPtr HookCallback(int nCode, IntPtr wParam, IntPtr lParam)
        {
            if (nCode >= 0 && wParam == (IntPtr)0x100) // WM_KEYDOWN
            {
                int vkCode = Marshal.ReadInt32(lParam);
                var form = Application.OpenForms[0] as Form1;
                if ((Keys)vkCode == form.toggleKey)
                {
                    if (form.isClicking)
                        form.StopClicking();
                    else
                        form.StartClicking();
                }
            }
            return CallNextHookEx(_hookID, nCode, wParam, lParam);
        }

        [DllImport("user32.dll")]
        private static extern IntPtr SetWindowsHookEx(int idHook, LowLevelKeyboardProc lpfn,
            IntPtr hMod, uint dwThreadId);

        [DllImport("user32.dll")]
        private static extern bool UnhookWindowsHookEx(IntPtr hhk);

        [DllImport("user32.dll")]
        private static extern IntPtr CallNextHookEx(IntPtr hhk, int nCode, IntPtr wParam, IntPtr lParam);

        [DllImport("kernel32.dll")]
        private static extern IntPtr GetModuleHandle(string lpModuleName);

        protected override void OnFormClosing(FormClosingEventArgs e)
        {
            UnhookWindowsHookEx(_hookID);
            base.OnFormClosing(e);
        }
    }
}
