const authShell = document.getElementById('auth-shell');
const siteShell = document.getElementById('site-shell');
const toast = document.getElementById('toast');
const userKey = 'citog-user';
let pendingUser = null;
function showToast(message){toast.textContent=message;toast.classList.add('show');window.setTimeout(()=>toast.classList.remove('show'),3200)}
function switchAuth(viewId){document.querySelectorAll('.auth-card').forEach(view=>view.classList.add('hidden'));document.getElementById(viewId).classList.remove('hidden')}
function enterSite(user){authShell.classList.add('hidden');siteShell.classList.remove('hidden');document.getElementById('member-name').textContent=user.name?user.name.split(' ')[0]:'there';window.scrollTo(0,0);observeReveals()}
document.querySelectorAll('[data-show]').forEach(button=>button.addEventListener('click',()=>switchAuth(button.dataset.show)));
document.getElementById('login-form').addEventListener('submit',event=>{event.preventDefault();const form=new FormData(event.currentTarget);const savedUser=JSON.parse(localStorage.getItem(userKey)||'null');if(!event.currentTarget.checkValidity())showToast('Please enter a valid email and password.');else if(!savedUser||savedUser.email!==form.get('email')){showToast('No account found. Please register first.');switchAuth('register-view');document.getElementById('register-email').value=form.get('email')}else{showToast('Welcome back.');enterSite(savedUser)}});
document.getElementById('register-form').addEventListener('submit',event=>{event.preventDefault();if(!event.currentTarget.checkValidity()){showToast('Complete the form with a valid email and password.');return}const form=new FormData(event.currentTarget);pendingUser={name:form.get('name'),email:form.get('email'),password:form.get('password')};document.getElementById('verify-email').textContent=pendingUser.email;switchAuth('verify-view');showToast('Your verification code is 123456 for this demo.')});
document.getElementById('verify-form').addEventListener('submit',event=>{event.preventDefault();const code=document.getElementById('verification-code').value;if(code!=='123456'){showToast('That code is not quite right. Try 123456.');return}localStorage.setItem(userKey,JSON.stringify(pendingUser));showToast('Email verified. Welcome to CITOG.');enterSite(pendingUser)});
document.getElementById('resend-code').addEventListener('click',()=>showToast('A fresh verification code was sent: 123456.'));
document.getElementById('forgot-link').addEventListener('click',event=>{event.preventDefault();showToast('Password reset is ready for the next backend connection.')});
document.getElementById('logout-btn').addEventListener('click',()=>{siteShell.classList.add('hidden');authShell.classList.remove('hidden');switchAuth('login-view');showToast('You have been logged out.')});
const menuToggle=document.getElementById('menu-toggle');const navLinks=document.getElementById('nav-links');menuToggle.addEventListener('click',()=>{const open=navLinks.classList.toggle('open');menuToggle.setAttribute('aria-expanded',open)});navLinks.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>navLinks.classList.remove('open')));window.addEventListener('scroll',()=>document.getElementById('navbar').classList.toggle('scrolled',window.scrollY>20),{passive:true});
function observeReveals(){const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting)entry.target.classList.add('visible')}),{threshold:.12});document.querySelectorAll('.reveal').forEach(element=>observer.observe(element))}
if(localStorage.getItem(userKey))switchAuth('login-view');

/* ================= CONTACT FORM (mailto, no backend needed) ================= */
function handleContactForm(event) {
  event.preventDefault();
  const name = document.getElementById('contactName').value.trim();
  const email = document.getElementById('contactEmail').value.trim();
  const message = document.getElementById('contactMessage').value.trim();
  const subject = encodeURIComponent('Portfolio Inquiry from ' + name);
  const body = encodeURIComponent(message + '\n\n— ' + name + ' (' + email + ')');
  window.location.href = 'mailto:celestineakinyemi358@gmail.com?subject=' + subject + '&body=' + body;
  showToast('Opening your email app to send the message…');
}

